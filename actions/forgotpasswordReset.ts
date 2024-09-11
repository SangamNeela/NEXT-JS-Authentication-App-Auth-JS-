"use server"
import { db } from "@/lib/db"
import bcryptjs from "bcryptjs"
import { forgotPasswordResetSchema } from "@/schemas/forgotPasswordResetSchema"
import z from "zod";
export async function forgotPasswordReset(token:string,newPassowrd:string){
    //check if token is present in db
    //if token present , check the expiry of the token
    //if expiry is in bonds, then extract the email from passwordtoken and find the email in user db
    //if found email, update the passowrd
    const parse = forgotPasswordResetSchema.safeParse({password:newPassowrd});
    console.log("parse error = ",parse.error)
    if(!parse.success){
        return {error:"please enter strong password"};
    }
    const passwordToken = await db.forgotPasswordToken.findFirst({
        where:{
            token:token,
        }
    })

    if(!passwordToken) return {error:"Password Link Expired"}

    if(passwordToken.expiery){
        console.log("time  = ",new Date(new Date().getTime()+26281000-6500000));
        if(passwordToken.expiery < new Date(new Date().getTime()+26281000-6500000)) return {error:"The Link is Expired"}
    }
    
    const {email}=passwordToken;
    const hashedPassword=await bcryptjs.hash(newPassowrd,10);
    const user = await db.user.update({
        where:{email},
        data:{password:hashedPassword}
    })

    if(!user)return {error:"Something went wrong! Unable to update Password"}

    return {success:"password change successfull"}
}