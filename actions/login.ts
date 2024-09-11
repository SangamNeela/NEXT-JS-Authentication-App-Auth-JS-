"use server"
import { loginSchema } from "@/schemas/loginSchema"
import z from "zod"
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { generatetoken } from "@/data/generateToken";
import { generate2FAtoken } from "@/data/generate2FAtoken";
import { sendEmail } from "@/lib/email";
import { send2FAEmail } from "@/lib/emailFor2FA";
export async  function login(values:z.infer<typeof loginSchema>){
    const validateFields=loginSchema.safeParse(values);
    if(!validateFields.success){
        return {error:"Invalid Fields123!"};
    }
    const {code}=validateFields.data;
    //verify user from database
    const user= await db.user.findUnique({
        where:{
            email:validateFields.data.email
        }
    });
    if(!user) return{error:"User Not Found"};
    if(!user.password) return{error:"please create account"};
    // check if email is verified
    if(!user.emailVerified){
        const token = await generatetoken(user.email);
        if(token){
            const ans = await sendEmail(token.email,token.token);
            if(!ans)return{error:"unable to send email"};
            return{error:"please verify your email,email sent to your email address"};
        }
        else return{error:"unable to send verification email"};
    }

    const isPasswordSame=await bcryptjs.compare(validateFields.data.password,user.password);
    if(isPasswordSame){
        if(code && user.isTwoFactorEnable){
            const twoFactorToken = await db.twoFactorToken.findUnique({
                where:{
                    token:code
                }
            })
            if(twoFactorToken?.expiery!<new Date(new Date().getTime())){
                return {error:"Your code is already expired"}
            }
            if(!twoFactorToken){
                return {error:"Invalid Code!!"};
            }
            const {token} =twoFactorToken
            await db.twoFactorToken.delete({
                where:{token}
            })
        }
        if(user.isTwoFactorEnable && !code){
            const Two_FAToken = await generate2FAtoken(user.email);
            if(!Two_FAToken)return{error:"Unable to send Code!"}
            const {token}=Two_FAToken
            const ans=await send2FAEmail(user.email,token);
            if(!ans)return {twofactor:false};
            return{twofactor:true};
        }
        const response = await signIn("credentials",{...validateFields.data,redirectTo:"/settings"});
    }
    else{
        return{error:"Invalid Password"};
    }
    return {success:"sign in successful"};
}