"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"



const serializeTransaction=(obj)=>{
    const serailized = {...obj}

    if(obj.balance){
        serailized.balance=obj.balance.toNumber()
    }
   

    if(obj.amount){
        serailized.amount=obj.amount.toNumber()
    }
    return serailized

}



export async function createAccount(data){
  try{
    const {userId} = await auth()
    if (!userId) throw new Error("Unauthorized")

    const user = await  db.user.findUnique({
      where:{clerkUserId:userId},

    })
    if(!user){
      throw new Error("User not found")
    }

    const balanceFLoat = parseFloat(data.balance)
    if(isNaN(balanceFLoat)){
      throw new Error("Invalid balance amount")
    }

    const existingAccounts = await db.account.findMany({
      where:{userId:user.id},
    })


    const shouldBeDefault = existingAccounts.length ===0 ? true:data.isDefault

    if(shouldBeDefault){
      await  db.account.updateMany({
        where:{userId:user.id, isDefault:true},
        data:{isDefault:false}
      })
    }

    const account = await db.account.create({
      data:{
        ...data,
        balance:balanceFLoat,
        userId:user.id,
        isDefault:shouldBeDefault,
      }
    })
    const serializedAccounts =serializeTransaction(account)
    revalidatePath("/dashboard")
    return {sucess:true,data:serializedAccounts}
  }catch(error){

    throw new Error(error.message)

  }
}


export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  // ✅ Auto-create user if not found
  if (!user) {
    user = await db.user.create({
      data: {
        clerkUserId: userId,
      },
    });
  }

  try {
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    const serializedAccounts = accounts.map((acc) => ({
      ...acc,
      balance: acc.balance?.toNumber?.() ?? acc.balance,
    }));

    return serializedAccounts;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to fetch accounts");
  }
}


export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}