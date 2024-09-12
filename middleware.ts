import {auth} from "@/auth"
import { apiAuthPrefix,authRoutes,publicRoutes } from "./routes";


export default  auth((req)=>{
    const {nextUrl} = req;
    const isLoggedin= !!req.auth
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