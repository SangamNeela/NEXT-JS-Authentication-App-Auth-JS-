"use client"
import { CardWrapper } from "./Card-Wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema"
import {z} from "zod";
import { Form,FormControl,FormField,FormItem,FormMessage,FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
import { useState } from "react"
import { forgotPassword } from "@/actions/forgotPassword"
import SyncLoader from "react-spinners/SyncLoader"
interface response{
    success?:string,
    error?:string
}

export default function ForgotPasswordForm(){
    const [error,setError]=useState<string | null>(null);
    const [success,setSuccess]=useState<string | null>(null);
    const [Loading,setLoading]=useState<boolean>(false);
    const form=useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver:zodResolver(forgotPasswordSchema),
        defaultValues:{
            email:"",
        }
    })
    const handleSubmit=async (data:z.infer<typeof forgotPasswordSchema>)=>{
            setLoading(true);
            let response = await forgotPassword(data.email);
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
            <CardWrapper headerlabel="Email Verificaiton to Reset Password" backButtonHref="/auth/login" backButtonLabel="Back to login">
                <FormSuccess successMessage={success}/>
            </CardWrapper>    
        )
    }

    return(
        <CardWrapper headerlabel="Email Verificaiton to Reset Password" backButtonHref="/auth/login" backButtonLabel="Back to login">
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@gmail.com" {...field} />
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
                        {errxor?<FormError errorMessage={error}/>:<></>} */}
                        <Button type="submit" size="lg" variant={"secondary"} className=" flex mx-auto">Verify</Button>
                    </form>
                </Form>
        </CardWrapper>
    )
}