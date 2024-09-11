"use client"
import { CardWrapper } from "./Card-Wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { Verify } from "@/actions/Verify";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Suspense } from 'react'
import HashLoader from "react-spinners/HashLoader";
export default function VerifyForm(){
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState<string|null>(null);
    const [success,setSuccess]=useState<string|null>(null);
    const [disableBtn,setDisableBtn]=useState<boolean>(false)
    const params=useSearchParams();
    const token = params.get("token")?.toString();
    const color = "#ff5733";
    
    const  handleGetVerificationTokenByToken=async ()=>{
        setDisableBtn(true);
        const tokenUser = await getVerificationTokenByToken(token as string);
        if(tokenUser && tokenUser.expiery && tokenUser?.expiery > new Date(new Date().getTime())){
            const ans = await Verify(tokenUser);
            setLoading(true);
            if(ans?.success){
                setSuccess(ans.success);
                setError(null);
                setLoading(false)
            }
            if(ans?.error){
                console.log("sangam");
                setSuccess(null);
                setError(ans.error);
                setLoading(false)
            }
        }
        else{
            setError("Verification Expired!")
            setSuccess(null);
        }

    }
    return(
        <div className="space-y-2">
        <CardWrapper headerlabel="welcome back" backButtonHref="/auth/login" backButtonLabel="Already have an Account?">
            {
                loading?
                <HashLoader color={color} loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader"/>
                :
                <div>
                <div>
                {success && error===null?<FormSuccess successMessage={success}/>:<></>}
                </div>
                <div>
                {success===null && error?<FormError errorMessage={error}/>:<></>}
                </div>
                </div>
            }
            <div className="flex justify-center mt-3">
            {disableBtn?
                <Button disabled size={"lg"} onClick={handleGetVerificationTokenByToken}>Click to Verify</Button>
                :
                <Button size={"lg"} onClick={handleGetVerificationTokenByToken}>Click to Verify</Button>
            }
            </div>
        </CardWrapper>
        </div>
    )
}