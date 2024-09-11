import { UserRole } from "@prisma/client";
import z from "zod";

export const SettingsSchema=z.object({
    name:z.optional(z.string().min(4,{message:"User name must be atleast 4 Characters"})),
    password:z.optional(z.string().min(6,{message:"password must be atleat 6 characters"})),
    newPassword:z.optional(z.string().min(6,{message:"password must be atleat 6 characters"})),
    role:z.optional(z.enum([UserRole.ADMIN,UserRole.USER])),
    email:z.optional(z.string().email()),
    isTwoFactorEnabled:z.optional(z.boolean()),
})

.refine(
    (data)=>{
        if(data.password && !data.newPassword){
            return false;
        }
        return true;
    },{
        message:"New Password is required!",
        path:["newPassword"]
    }
)

.refine(
    (data)=>{
        if(data.newPassword && !data.password){
            return false;
        }
        return true;
    },{
        message:"Password is required!",
        path:["password"]
    }
)