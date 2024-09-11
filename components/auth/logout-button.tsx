"use client"
import { logout } from "@/actions/logout";
interface loginButtonProps{
    children:React.ReactNode,
}

export const LogoutButton=({children}:loginButtonProps)=>{
    const onClick= async ()=>{
        await logout();
    }
    return (
        <span onClick={onClick}>
            {children}
        </span>
    )
}