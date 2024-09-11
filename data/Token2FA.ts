"use server"
import { db } from "@/lib/db";
export async function getVerificationTokenByToken(token:string){
    try {
        console.log("token from = = ",token)
        const userToken = await db.twoFactorToken.findFirst({
            where:{
                token:token
            }
        })
        if(!userToken)return null;
        return userToken;
    } catch (error) {
        console.log("error occured in getVerificationTokenByEmail Method",error);
        return null;
    }
}

export async function getVerificationTokenByEmail(email:string){
    try {
        const verificationToken = await db.twoFactorToken.findFirst({
            where:{
                email
            }
        });
        if(!verificationToken)return null
        return verificationToken;
    } catch (error) {
        console.log("error occured in getVerificationTokenByEmail Method",error);
        return null;
    }
}