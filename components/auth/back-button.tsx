"use client"
import { Button } from "../ui/button"
import Link from "next/link"
interface backButtonProps{
    label:string|"",
    href:string|"",
}

export const BackButton=({href,label}:backButtonProps)=>{
    return(
        <Button variant={"link"} asChild className="px-0"> 
            <Link href={href!}>{label}</Link>
        </Button>
    )
}