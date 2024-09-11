"use client"
import { useRouter } from "next/navigation";
interface loginButtonProps{
    children:React.ReactNode,
    mode?:"redirect" | "modal",
    asChild?:boolean;
}

export const LoginButton=({children,mode="redirect",asChild}:loginButtonProps)=>{
    const router=useRouter();
    const onClick=()=>{
        router.push("/auth/login");
    }
    return (
        <span onClick={onClick}>
            {children}
        </span>
    )
}