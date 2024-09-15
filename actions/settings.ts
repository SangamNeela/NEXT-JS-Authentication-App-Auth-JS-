"use server"

import z from "zod"

import { SettingsSchema } from "@/schemas/SettingsSchema"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { sendEmail } from "@/lib/email";
import { generatetoken } from "@/data/generateToken";
import bcryptjs from "bcryptjs"
import { hash } from "crypto"
export const settings=async (values:z.infer<typeof SettingsSchema>)=>{
    console.log("values from settings = ",values);
    const user=await auth();

    if(!user?.user){
        return {error:"Unauthorized!"}
    }
    const dbUser = await db.user.findUnique({
        where:{
            id:user.user.id
        }
    })
    if(!dbUser){
        return {error:"Unauthorized!"}
    }

    if(user.user.isOAuth){
        values.email=undefined;
        values.password=undefined;
        values.newPassword=undefined;
        values.isTwoFactorEnabled=undefined;
    }

    if(values.email && values.email!==user.user.email){
        const existingUser=await db.user.findFirst({where:{email:values.email}});

        if(existingUser && existingUser.id!==user.user.id){
            return{error:"Email Already in use!"}
        }

        const token = await generatetoken(values.email);
        if(token){
            const ans = await sendEmail(token.email,token.token);
            if(!ans)return{error:"unable to send email"};
            return{error:"please verify your email,email sent to your email address"};
        }
        return{error:"unable to send email"};
    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordsMatch = await bcryptjs.compare(values.password,dbUser.password);
        console.log("pass match = ",passwordsMatch)
        if(!passwordsMatch){
            return{error:"Incorrect Password"};
        } 
        const hashedPassword=await bcryptjs.hash(values.newPassword,10);
        values.password=hashedPassword;
        values.newPassword=undefined;
    }
    if(values.isTwoFactorEnabled){

    }
    await db.user.update({
        where:{id:dbUser.id},
        data:{
            isTwoFactorEnable:values.isTwoFactorEnabled,
            name:values.name,
            role:values.role,
            email:values.email,
            password:values.password,
        }
    })
    return {success:"Settings Updated"};
}