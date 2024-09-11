"use server"
import { registerSchema } from "@/schemas/registerSchema"
import z from "zod"
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generatetoken } from "@/data/generateToken";
import { sendEmail } from "@/lib/email";
export async function register(values:z.infer<typeof registerSchema>){
    const validateFields=registerSchema.safeParse(values);
    if(!validateFields.success){
        return {error:"Invalid Fields!"}
    }
    const {username,email,password}=validateFields.data;
    try {
        const userWithEmail=await db.user.findUnique({
            where:{
                email:validateFields.data.email
            }
        });
        
        if(userWithEmail){
            return {error:"Email is already taken"};
        }

        const hashedPassword=await bcrypt.hash(password,10);
        
        await db.user.create({
            data:{
                name:username,
                email,
                password:hashedPassword,
            }
        })
        
        const token = await generatetoken(email);
        if(token){
            const ans = await sendEmail(token.email,token.token);
            if(!ans)return{error:"unable to send email"};
            return{success:"please verify your email,email sent to your email address"};
        }
        else return{error:"unable to send verification email"};
    } catch (error) {
        console.log("eroorr while registration",error);
        return {error:"something went wrong"};
    }
}