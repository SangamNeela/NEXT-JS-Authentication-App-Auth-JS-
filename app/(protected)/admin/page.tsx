"use client"

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { adminOnlyServerAction } from "@/actions/adminOnlyServerAction";
export default function AdminPage(){
    function handleAPIClick(){
        fetch("/api/admin")
        .then((response)=>{
            if(response.ok){
                console.log("OKAY");
                toast.success("Allowed API Route");
            }
            else{
                console.error("FORBIDDEN");
                toast.error("FORBIDDEN");
            }
        })
    }

    async function handleServerAction(){
        const res = await adminOnlyServerAction();
        if(res.success){
            toast.success(res.success)
        }
        else{
            toast.error(res.error)
        }
    }
    return(
        <Card className="mt-4">
            <CardHeader className="font-semibold text-2xl">
                Admin 
            </CardHeader>
            <CardContent className="space-y-6">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess successMessage="you are allowed to see this content"/>
                </RoleGate>
                <div className="flex justify-between items-center gap-x-40 shadow-lg px-2 py-2 rounded-lg">
                    <p className="text-md font-semibold font-mono">Admin Only API Route</p>
                    <Button onClick={handleAPIClick}>Click to Test</Button>
                </div>
                <div className="flex items-center gap-x-40 shadow-lg px-2 py-2 rounded-lg">
                    <p className="text-md font-semibold font-mono">Admin Only Server Action</p>
                    <Button onClick={handleServerAction}>Click to Test</Button>
                </div>
            </CardContent>


        </Card>
    )
}