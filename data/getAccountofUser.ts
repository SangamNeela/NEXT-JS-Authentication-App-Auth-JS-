import { db } from "@/lib/db";

export async function getAccountOfUser(id:string){
    
    try {
        const UserAccount = await db.account.findFirst({
            where:{
                userId:id,
            }
        })

        return UserAccount;
    } catch (error) {
        console.log("error occured while getting account of user" ,error);
        return null;
    }
}