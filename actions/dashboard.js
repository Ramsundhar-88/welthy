"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Select } from "react-day-picker"

const serializeTranscation=(obj)=>{
    const serailized = {...obj}

    if(obj.balance){
        serailized.balance=obj.balance.toNumber()
    }
    return serailized

    if(obj.amount){
        serailized.amount=obj.amount.toNumber()
    }
    return serailized

}


export async function createAccount(data) {

    try {

        const {userId} = await auth()
        if(!userId) throw new Error("Unauthorized")

        
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
            });

        if(!user){
            throw new Error("User not found")
        }

        // Converting balance to float before saving
        const balanceFloat = parseFloat(data.balance)
        if(isNaN(balanceFloat)){
            throw new Error("Invalid balance amount")
        }

        // Chcking is this first account
        const existingAccounts = await db.account.findMany({
            where:{userId:user.id}
        })



        // if this account should be default , unset other default accounts

        const shoulBeDefault = existingAccounts.length===0 ? true:data.isDefault

        if(shoulBeDefault){
            await db.account.updateMany({
                where :{userId:user.id,isDefault:true},
                data:{isDefault:false}

            })
        }

        const account = await db.account.create({
            data:{
                ...data,
                balance:balanceFloat,
                userId:user.id,
                isDefault:shoulBeDefault

            }

        })

        const serailizedAccount = serializeTranscation(account)

        revalidatePath("/dashboard")
            return {sucess:true, data:serailizedAccount}


    } catch (error) {
        throw new Error(error.message)
        
    }

    

    
}

export async function getUSerAcccounts(){
    const{userId}=await auth()
    if(!userId) throw new Error("Unauthorized")

    const user = await db.user.findUnique({
        where:{clerkUserId:userId}
    })

    if(!user){
        throw new Error("User not found")
    }

    const accounts = await db.account.findMany({
        where:{userId:user.id},
        orderBy:{createdAt:"desc"},
        include:{
            _count:{
                select:{
                    transcations:true,
                }
            }
        }

    })

    const serailizedAccount =serializeTranscation(accounts)

    return serailizedAccount
}

