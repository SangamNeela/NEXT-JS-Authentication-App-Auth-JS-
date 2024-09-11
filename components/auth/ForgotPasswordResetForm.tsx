"use client"
import { CardWrapper } from "./Card-Wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { forgotPasswordResetSchema } from "@/schemas/forgotPasswordResetSchema"
import {z} from "zod";
import { useRouter } from "next/navigation"
import { Form,FormControl,FormField,FormItem,FormMessage,FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
import { useState } from "react"
import { forgotPassword } from "@/actions/forgotPassword"
import { forgotPasswordReset } from "@/actions/forgotpasswordReset"
import SyncLoader from "react-spinners/SyncLoader"
import { useSearchParams } from "next/navigation"
interface response{
    success?:string,
    error?:string
}

export default function ForgotPasswordResetForm(){
    const [error,setError]=useState<string | null>(null);
    const [success,setSuccess]=useState<string | null>(null);
    const [Loading,setLoading]=useState<boolean>(false);
    const params=useSearchParams();
    const token=params.get("token")?.toString();
    const form=useForm<z.infer<typeof forgotPasswordResetSchema>>({
        resolver:zodResolver(forgotPasswordResetSchema),
        defaultValues:{
            password:"",
        }
    })
    const handleSubmit=async (data:z.infer<typeof forgotPasswordResetSchema>)=>{
            setLoading(true);
            let response = await forgotPasswordReset(token as string,data.password);
            if(response){
                if(response.error){
                    setError(response.error);
                    setSuccess(null);
                    setLoading(false);
                }else{
                    if(response.success)setSuccess(response.success);
                    setError(null);
                    setLoading(false);
                }
            }
            
    }

    if(success){
        return(
            <CardWrapper headerlabel="New Password Registration" backButtonHref="/auth/login" backButtonLabel="Back to login">
                <FormSuccess successMessage={success}/>
            </CardWrapper>
        )
    }
    return(
        <CardWrapper headerlabel="New Password Registration" backButtonHref="/auth/login" backButtonLabel="Back to login">
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {Loading?
                            <SyncLoader
                            color={"#000000"}
                            loading={Loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />:<>
                            {success && !error? <FormSuccess successMessage={success}/>:<></>}
                            {error && !success ? <FormError errorMessage={error}/>:<></>}
                          </>
                        }
                        {/* {success && !error && <FormSuccess successMessage={success}/>}
                        {error?<FormError errorMessage={error}/>:<></>} */}
                        <Button type="submit" size="lg" variant={"secondary"} className=" flex mx-auto">Reset</Button>
                    </form>
                </Form>
        </CardWrapper>
    )
}