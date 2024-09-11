"use client"

import { UserRole } from "@prisma/client"
import { FormError } from "../form-error"
import { useCurrentRole } from "@/hooks/useCurrentRole"

interface RoleGateProps{
    children:React.ReactNode,
    allowedRole:UserRole
}

export const RoleGate=({
    children,
    allowedRole
}:RoleGateProps)=>{
    const role= useCurrentRole();
    
    if(role!==allowedRole){
        return(
            <FormError errorMessage={"you do not have permission to view this content"}/>
        )
    }
    return(
        <>
            {children}
        </>
    )
}