"use server"

import { VerificationToken } from "@prisma/client"
import { db } from "@/lib/db";
export const Verify=async (tokenUser:VerificationToken)=>{
    if(!tokenUser)return null;
    const user = await db.user.findUnique({
        where:{
            email:tokenUser.email
        }
    })

    if(!user) return {error:"user not found!!"};
    
    const updatedUser = await db.user.update({
        where:{
            id:user.id,
        },
        data:{
            emailVerified:new Date(),
        }
    })
    
    if(!updatedUser)
        return {error:"something went wrong!"}

    return {success:"Email verified,please continue login"}

}