"use server"
import { signIn } from "@/auth"

export async function loginWithOAuth(provider:string){
    await signIn(provider);
}   