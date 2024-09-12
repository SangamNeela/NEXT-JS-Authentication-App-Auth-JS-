import {auth} from "@/auth"
import { apiAuthPrefix,authRoutes,publicRoutes } from "./routes";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default async function middleware(req:NextRequest){
    const {nextUrl} = req;
    // const isLoggedin= !!req.auth;
    const secret = process.env.AUTH_SECRET as string;
    const token = await getToken({ req, secret,salt:"100"});
    const isLoggedin = !!token;
    console.log("ISLOGGES IN = ",isLoggedin);
    const isApiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute=publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute=authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute)return ;
    if(isPublicRoute){
        return;
    }
    if(isAuthRoute){
        if(isLoggedin){
            return Response.redirect(new URL("/settings",nextUrl));
        }
        return;
    }

    if(!isLoggedin && !isPublicRoute){
      return Response.redirect(new URL("/auth/login",nextUrl));
    }
    if(!isLoggedin){
        return Response.redirect(new URL("/auth/login",nextUrl));
    }
    return
})


export const config={
    matcher:['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
}