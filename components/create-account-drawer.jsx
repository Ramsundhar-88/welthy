"use client"

import React, { useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { useForm } from 'react-hook-form'
import { accountSchema } from '@/app/lib/schema'
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from './ui/input'
import {Switch} from './ui/switch'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const CreateAccountDrawer = ({children}) => {

    const [open,setOpen] = useState(false)

    const {register,handleSubmit,formState:{errors},setValue,watch,reset}=useForm({
        resolver:zodResolver(accountSchema),
        defaultValues:{
            name:"",
            type:"Current",
            balance:"",
            isDefault:false
        }

    })

    const onSubmit=async(data)=>{
        console.log(data)

    }

  return (

        <Drawer open={open} onOpenChange={setOpen} >
            <DrawerTrigger asChild>{children}</DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Create New Account </DrawerTitle>
                    </DrawerHeader>


                    <div className='px-4 pb-4'>

                        <form className='space-y-4 ' onSubmit={handleSubmit(onSubmit)} >


                            <div className='space-y-2'>
                                <label htmlFor='name' className='text-sm font-medium'>Account Name</label>
                                <Input 
                                id="name" placeholder="e.g., Main checking"
                                {...register("name")}/>
                                {errors.name && (
                                    <p className='text-sm text-red-500'>{errors.name.message}</p>
                                )}
                            </div>

                            <div className='space-y-2'>
                                <label htmlFor='name' className='text-sm font-medium'>Account Type</label>
                                <Select 
                                
                                onValueChange={(value)=> setValue("type",value)} 
                                defaultValues={watch("type")}>
                                   
                                    <SelectTrigger id='type'>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="CURRENT">Current</SelectItem>
                                        <SelectItem value="SAVINGS">Savings</SelectItem>
                                    </SelectContent>


                                </Select>
                                
                                {errors.type && (
                                    <p className='text-sm text-red-500'>{errors.type.message}</p>
                                )}
                            </div>



                            <div className='space-y-2'>
                                <label htmlFor='balance' className='text-sm font-medium'>Intial Balance</label>
                                <Input 
                                id="balance" placeholder="0.00" type="number" step="0.01"
                                {...register("balance")}/>
                                {errors.balance && (
                                    <p className='text-sm text-red-500'>{errors.balance.message}</p>
                                )}
                            </div>

                            <div className='flex items-center justify-between rounded-lg border p-3'>
                                <div>
                                <label htmlFor='isDefault' className='text-sm font-medium cursor-pointer'>Set as default</label>
                                <p className='text-sm text-muted-foreground'>This account will be selected by default for transcations</p>

                                </div>
                                <Switch
                                id="isDefault"
                                onCheckedChange={(checked)=>setValue("isDefault",checked)}
                                checked={watch("isDefault")}/>

                            </div>

                            <div className='flex gap-4 pt-4'>
                                <DrawerClose asChild>
                                    <Button type='button' variant="outline" className="flex-1"
                                    >Cancel</Button>

                                </DrawerClose>
                                <Button type="submit" className="flex-1">Create Account</Button>
                            </div>





                        </form>
                    </div>
                </DrawerContent>
            


        </Drawer>
      
  )
}

export default CreateAccountDrawer
