"use server"
import { auth } from "@/auth"
import { UserRole } from "@prisma/client";

export async function adminOnlyServerAction(){
    const session = await auth();
    const role=session?.user.role;

    if(role===UserRole.ADMIN){
        return {success:"Allowed Server Action"}
    }
    return {error:"FORBIDDEN Server Action"}
}