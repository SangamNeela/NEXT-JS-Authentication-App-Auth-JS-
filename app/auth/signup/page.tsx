import React from "react";
import { RegisterForm } from "@/components/auth/register-form"
 function Signup({children}:{children:React.ReactNode}){

    return(
        <div>
            <RegisterForm/>
        </div>
    )
}

export default Signup;