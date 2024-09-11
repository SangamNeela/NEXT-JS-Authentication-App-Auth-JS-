"use client"
import { CardWrapper } from "./Card-Wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/schemas/loginSchema"
import {z} from "zod";
import { useRouter } from "next/navigation"
import { login } from "@/actions/login"
import { Form,FormControl,FormField,FormItem,FormMessage,FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
import { useState } from "react"
import SyncLoader from "react-spinners/SyncLoader"
interface response{
    success?:string,
    error?:string
}
export default function LoginForm(){
    const [error,setError]=useState<string | null>(null);
    const [success,setSuccess]=useState<string | null>(null);
    const [twoFactor,setTwoFactor]=useState<boolean>(false);
    const [loading,setLoading]=useState<boolean>(false);
    const router=useRouter();
    const color = "#ff5733";
    const form=useForm<z.infer<typeof loginSchema>>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    })
    const handleSubmit=async (data:z.infer<typeof loginSchema>)=>{
            setLoading(true);
            let response = await login(data);
            if(response){
                if(response.error){
                    setError(response.error);
                    setSuccess(null);
                    setLoading(false);
                }
                if(response?.success){
                    setSuccess("successfull");
                    setError(null);
                    setLoading(false);
                }
                if(response.twofactor){
                    setTwoFactor(true);
                    setLoading(false);
                }
            }
    }
    return (
        <div>
            <CardWrapper headerlabel="welcome back" backButtonHref="/auth/signup" backButtonLabel="Don't have an Account?" backButtonForgotPasswordLabel="Forgot Password?" backButtonForgotPasswordLink="/auth/forgotpassword"  showSocial>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                    {twoFactor && (
                            <FormField
                            control={form.control}
                            name="code"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Verification Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    {!twoFactor && (
                        <>
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </>
                    )}
                    {
                        loading?
                        <SyncLoader
                            color={"#000000"}
                            loading={loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        :
                        <>{success && !error && <FormSuccess successMessage={success}/>}
                        {error?<FormError errorMessage={error}/>:<></>}</>
                    }
                        <Button type="submit" size="lg" variant={"secondary"} className=" flex mx-auto">Login</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}