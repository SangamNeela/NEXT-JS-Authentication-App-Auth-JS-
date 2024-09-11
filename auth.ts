import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"
import  { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./schemas/loginSchema";
import { User } from "@prisma/client"
import type { Provider } from "next-auth/providers"
import { getAccountOfUser } from "./data/getAccountofUser"

declare module "next-auth" {
  interface Session {
    user: {
      role?:UserRole|null
      isTwoFactorEnabled?:Boolean
      isOAuth?:Boolean
    } & DefaultSession["user"]
  }
}
declare module "next-auth"{
  interface User{
    role?:UserRole|null
    isTwoFactorEnabled?:Boolean
    isOAuth?:Boolean
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?:UserRole|null,
    isTwoFactorEnabled?:Boolean
    isOAuth?:Boolean
  }
}


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session:{strategy:"jwt"},
  pages:{
    error:"/auth/error"
  },
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id:user.id},
        data:{emailVerified:new Date()}
      })
    }
  },
  callbacks:{
    async signIn({user,account}){
      if(account?.provider!=="credentials") return true;
      const existingUser = await db.user.findFirst({
        where:{id:user?.id}
      })
      if(!existingUser?.emailVerified) return false;
      return true;
    },
    async session({session,token}){
      if(token.sub && session.user){
        session.user.id=token.sub;
      }
      if(token.role){
        session.user.role=token.role;
      }
      if(token.isTwoFactorEnabled){
        session.user.isTwoFactorEnabled=token.isTwoFactorEnabled;
      }
      if(session.user.name!==token.name){
        session.user.name=token.name;
      }
      if(session.user.role!==token.role){
        session.user.role=token.role;
      }
      if(token.isOAuth){
        session.user.isOAuth=token.isOAuth;
      }
      return session;
    },
    async jwt({token,user}){
      if(user){
        token.name=user.name;
        token.role=user.role;
        
      }
      const dbUser = await db.user.findFirst({
        where:{
          email:token.email?.toString()
        }
      });

      const accountUser=await getAccountOfUser(dbUser?.id!)
      const isOAuth=!!accountUser;
      if(dbUser?.isTwoFactorEnable){
        token.isTwoFactorEnabled =  dbUser.isTwoFactorEnable;
      }else{
        token.isTwoFactorEnabled=dbUser?.isTwoFactorEnable;
      }
      if(dbUser?.name!==token?.name){
        token.name=dbUser?.name;
      }
      if(dbUser?.role===UserRole.ADMIN){
        token.role=UserRole.ADMIN;
      }
      if(dbUser?.role===UserRole.USER){
        token.role=UserRole.USER;
      }
      if(isOAuth){
        token.isOAuth=true;
      }
      else{
        token.isOAuth=false;
      }
      return token
    },
  },
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validataData=loginSchema.safeParse(credentials);
        if(validataData.success){
          const user= await db.user.findUnique({
            where:{
                email:validataData.data.email
            }
          });
          return user;
        }
        return null;
      },
  }),
],
})