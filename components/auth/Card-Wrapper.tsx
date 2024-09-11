"use client"

import { Card,CardContent,CardFooter,CardHeader } from "../ui/card"
import { Header } from "./header"
import {Social} from "@/components/auth/Social"
import { BackButton } from "./back-button"

interface CardWrapperProps{
    children:React.ReactNode,
    headerlabel:string,
    backButtonLabel:string,
    backButtonHref:string,
    showSocial?:boolean
    backButtonForgotPasswordLabel?:string|undefined,
    backButtonForgotPasswordLink?:string|undefined,
}

export const CardWrapper=({children,headerlabel,backButtonHref,backButtonLabel,showSocial,backButtonForgotPasswordLabel,backButtonForgotPasswordLink}:CardWrapperProps)=>{
    return(
        <div className=" w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[550px] shadow-lg">
            <Card >
                <CardHeader>
                    <Header label={headerlabel}/>                    
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                {
                    showSocial &&

                    <CardFooter>
                        <Social/>
                    </CardFooter>
                }
                <CardFooter className="flex flex-col items-start">
                    <BackButton label={backButtonLabel} href={backButtonHref}/>
                    {
                    backButtonForgotPasswordLabel && backButtonForgotPasswordLink
                    ?
                    <BackButton label={backButtonForgotPasswordLabel} href={backButtonForgotPasswordLink}/>
                    :
                    <></>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}