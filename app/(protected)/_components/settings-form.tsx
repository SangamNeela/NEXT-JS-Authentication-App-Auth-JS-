import { Form,FormControl,FormField,FormItem,FormMessage,FormLabel, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { SettingsSchema } from "@/schemas/SettingsSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue,SelectGroup } from "@radix-ui/react-select";
import { Switch } from "@/components/ui/switch";
import z from "zod";
import { UserRole } from "@prisma/client";
import { useUser } from "@/hooks/useUser";
interface response {
    success?:string,
    error?:string,
}
function SettingsForm(){
    const user=useUser();
    const [error,setError]=useState<string | undefined>();
    const [success,setSuccess]=useState<string | undefined>();
    const [isPending,startTransition]=useTransition()
    const {update}=useSession();
    const form=useForm<z.infer<typeof SettingsSchema>>({
        resolver:zodResolver(SettingsSchema),
        defaultValues:{
            name: `${user?.name}` || undefined,
            email:`${user?.email}` || undefined,
            password:undefined,
            newPassword:undefined,
            role:undefined,
            isTwoFactorEnabled:user?.isTwoFactorEnabled as boolean,

        }
    })

    const handleSubmit=async (data:z.infer<typeof SettingsSchema>)=>{
        startTransition(()=>{
            settings(data)
            .then((res)=>{
                update();
                if(res.error){
                    setError(res.error);
                    setSuccess(undefined);
                }else{
                    setSuccess(res.success);
                    setError(undefined);
                }
            }).catch((err)=>{
                setError("Something Went Wrong here")
            })
            
        })
    }

    return(
        <div>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 min-w-[600px]" > 
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!user?.isOAuth && (
                    <>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="JohnDoe@gmail.com" {...field} />
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
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </>
                )}
                    
                    <FormField
                        control={form.control}
                        name="role"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <select
                                    disabled={isPending}
                                    {...field} // Spread field props to bind onChange, value, etc.
                                    >
                                    <option value="" disabled>Select a role</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="USER">User</option>
                                    </select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {!user?.isOAuth && (
                    <>
                    <FormField
                        control={form.control}
                        name="isTwoFactorEnabled"
                        render={({field})=>(
                            <FormItem className="flex flex-row items-center justify-center rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Two Factor Authentication</FormLabel>
                                    <FormDescription>
                                        Enable two factor authentication for your account
                                    </FormDescription>
                                    <FormControl>
                                        <Switch disabled={isPending} checked={field.value ?? user?.isTwoFactorEnabled as boolean} onCheckedChange={field.onChange} /> 
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    </>
                    )}
                    {success && !error && <FormSuccess successMessage={success}/>}
                    {error?<FormError errorMessage={error}/>:<></>}
                    <Button type="submit" disabled={isPending} size="lg" variant={"secondary"} className=" flex mx-auto">Save</Button>
                </form>
            </Form>
            </div>
        )
}

export default SettingsForm;