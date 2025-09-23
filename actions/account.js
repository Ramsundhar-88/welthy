"use server"
import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { success } from "zod"

const serializeTranscation=(obj)=>{
    const serailized = {...obj}

    if(obj.balance){
        serailized.balance=obj.balance.toNumber()
    }
    

    if(obj.amount){
        serailized.amount=obj.amount.toNumber()
    }
    return serailized

}

export async function updateDefaultAccount(accountId){
    try{
        const {userId} = await auth()
        if(!userId) throw new Error("Unauthorized")

        
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
            });

        if(!user){
            throw new Error("User not found")
        }

        await db.account.updateMany({
            where:{userId:user.id,isDefault:true},
            data:{isDefault:false}
        })

        const account = db.account.update({
            where:{
                id:accountId,
                userId:user.id
            },
            data:{
                isDefault:true

            }
        })


        revalidatePath('/dashboard')

        return {success:true,data:serializeTranscation(account)}
        
    }catch(error){
        return {success:false,error:error.message}

    }
}