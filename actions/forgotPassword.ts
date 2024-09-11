"use server"
import { db } from "@/lib/db";
import { generatetoken } from "@/data/generateTokenForgotPassword";
import { sendEmail } from "@/lib/email";
export async function forgotPassword(email:string){
    //check if user exists in the database
    const user = await db.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        return {error:"User not found!"}
    }

    if(!user.password){
        return {error:"User Account isn't based on Credentials"}
    }
    //token generation and saving it in the db
    const userToken = await generatetoken(user.email)

    if(!userToken)return {error:"unable to process"}

    //sending the mail to user with the token link 

    const ans = await sendEmail(userToken.email,userToken.token,true);
    // const ans=true;
    if(!ans)return {error:"unable to send email"};

    return {success:"reset link is sent successfully to your email address"};

    
}