"use server"
import { signOut } from "@/auth";


export async function logout (){
    console.log("sangam here in logout/.........................");
    const ans  = await signOut({redirectTo:"/auth/login"});
    console.log("ans = ",ans);
}