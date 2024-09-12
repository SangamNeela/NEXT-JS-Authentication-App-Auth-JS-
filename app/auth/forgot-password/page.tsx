import ForgotPasswordResetForm from "@/components/auth/ForgotPasswordResetForm"
import { Suspense } from "react"
export default function ForgotPasswordLinkPage(){

    return(
        <Suspense>
        <ForgotPasswordResetForm/>
        </Suspense>
    )
}