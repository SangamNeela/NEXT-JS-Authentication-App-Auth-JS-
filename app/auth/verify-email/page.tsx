import VerifyForm from "@/components/auth/VerifyForm";
import { useEffect,useState } from "react";
import { Suspense } from "react";
export default function VerifyEmail(){
    return(
        <div>
            <Suspense>
            <VerifyForm/>
            </Suspense>
        </div>
    )
}