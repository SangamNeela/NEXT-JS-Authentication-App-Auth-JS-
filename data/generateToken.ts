import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "./verification-token";
import {v4 as uuidv4} from "uuid"
export async function generatetoken(email:string){
        try {
            const token = await getVerificationTokenByEmail(email);
            if(!token){
                console.log("token not present")
                const newToken = await db.verificationToken.create({
                    data:{
                        email:email,
                        token:uuidv4(),
                        expiery:new Date(new Date().getTime()+26281000+3600000+3600000),
                    }
                })
                return newToken
            }
            if(token){
                console.log("token present...")
                await db.verificationToken.deleteMany({
                    where: {
                      email,
                    },
                  });
                const renewedtoken = await db.verificationToken.create({
                    data:{
                        email:email,
                        token:uuidv4(),
                        expiery:new Date(new Date().getTime()+16281000+3600000+3600000),
                    }
                })
                return renewedtoken;
            }
        } catch (error) {
            console.log("generete token function in data follder",error);
            return null;
        }
}
