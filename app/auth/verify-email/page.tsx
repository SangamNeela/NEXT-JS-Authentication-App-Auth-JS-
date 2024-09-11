import VerifyForm from "@/components/auth/VerifyForm";
import { useSearchParams } from "next/navigation";
import { useEffect,useState } from "react";
export default function VerifyEmail(){
    return(
        <div>
            <VerifyForm/>
        </div>
    )
}