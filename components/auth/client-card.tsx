"use client"
import ServerCardWrapper from "./ServerCardWrapper";
import { useUser } from "@/hooks/useUser";
export default function ClientCard(){

    const user = useUser();
    return(
        <ServerCardWrapper headerLabel={"Client Component"}>
            <div className="flex flex-col gap-y-8">
                <div className="flex justify-between gap-x-64 shadow-lg rounded-lg p-1">
                    <p className="p-1">Name</p>
                    <p>{user?.name}</p>
                </div>
                <div className="flex justify-between gap-x-64 shadow-lg rounded-lg p-1">
                    <p className="p-1">E-Mail</p>
                    <p>{user?.email}</p>
                </div>
                <div className="flex justify-between gap-x-64 shadow-lg rounded-lg p-1">
                    <p className="p-1">Role</p>
                    <p>{user?.role}</p>
                </div>
                <div className="flex justify-between gap-x-64 shadow-lg rounded-lg p-1">
                    <p className="p-1">Two Factor Authentication</p>
                    <p>{user?.isTwoFactorEnabled?"ON":"OFF"}</p>
                </div>
            </div>
        </ServerCardWrapper>
    )
}