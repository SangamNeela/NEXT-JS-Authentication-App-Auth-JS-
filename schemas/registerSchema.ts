import  z from "zod";

export const registerSchema=z.object({
    username:z.string()
    .min(3,{message:"UserName must contain at least 3 character(s)"})
    .max(30,{message:"User Name must contain at most 30 character(s)"}),
    
    email:z.string().email(),
    
    password:z.string()
    .min(6,{message:"Password must contain at least 6 character(s)"})
    .max(50,{message:"Password must contain at most 50 character(s)"})
})
