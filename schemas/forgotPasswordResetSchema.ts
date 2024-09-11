import z from "zod";

export const forgotPasswordResetSchema=z.object({
    password:z.string()
    .min(6,{message:"Password must contain at least 6 character(s)"})
    .max(50,{message:"Password must contain at most 50 character(s)"})
})