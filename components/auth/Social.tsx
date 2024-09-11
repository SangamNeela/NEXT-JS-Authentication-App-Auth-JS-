"use client"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button"
import Link from "next/link";
import { loginWithOAuth } from "@/actions/loginWithOAuth";

export const Social=()=>{

    return(
        <div className="flex flex-col gap-y-3 w-full">
        <Button size="lg" onClick={()=>loginWithOAuth("google")}>
            <Link href=""><FcGoogle /></Link>
        </Button>
        <Button size="lg" variant={"outline"} onClick={()=>loginWithOAuth("github")}>
            <Link href=""><FaGithub /></Link>
        </Button>
        </div>
    )
}