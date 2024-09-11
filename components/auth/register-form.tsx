"use client"
import { CardWrapper } from "./Card-Wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from "@/schemas/registerSchema"
import {z} from "zod";
import { register } from "@/actions/register"
import { Form,FormControl,FormField,FormItem,FormMessage,FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
import { useState } from "react"
import SyncLoader from "react-spinners/SyncLoader"
export default function RegisterForm(){
    const [error,setError]=useState<string |null>(null);
    const [success,setSuccess]=useState<string |null>(null);
    const [loading,setLoading]=useState<boolean>(false);
    const form=useForm<z.infer<typeof registerSchema>>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    })
    const handleSubmit=(data:z.infer<typeof registerSchema>)=>{
            setLoading(true);
            register(data).then(res=>{
                if(res.error){
                    setSuccess(null);
                    setError(res.error);
                    setLoading(false);
                }
                if(res.success){
                    setSuccess(res.success);
                    setError(null);
                    setLoading(false);
                }
            })
    }
    return (
        <div>
            <CardWrapper headerlabel="welcome back" backButtonHref="/auth/login" backButtonLabel="Already have an Account?" showSocial>
                <Form {...form}>
                    
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="">
                    <FormField
                            control={form.control}
                            name="username"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        {
                            loading?
                            <div className="my-4">
                            <SyncLoader
                                color={"#000000"}
                                loading={loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></div>
                            :
                            <div className="mt-3">
                                {success && !error && <FormSuccess successMessage={success}/>}
                                {error  && <FormError errorMessage={error}/>}
                            </div>
                        }
                        <Button type="submit" size="lg" variant={"secondary"} className=" flex mx-auto">SignUp</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}