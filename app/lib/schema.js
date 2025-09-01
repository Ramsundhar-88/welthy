import {z} from "zod"
export const accountSchema = z.object({
    name:z.string().min(1,"Name is required"),
    type:z.enum(["Current","Saving"]),
    balance:z.string().min(1,"Intial balance is required"),
    isDefault:z.boolean().default(false)

})