
import { User } from "@prisma/client";
import ServerCardWrapper from "./ServerCardWrapper";
import { auth } from "@/auth";
interface ServerUser{
    user:User
}
export default async function ServerCard(){
    const session =await auth()
    const user = (session);

    return(
        <ServerCardWrapper headerLabel={"Server Component"}>
            <div className="flex flex-col gap-y-8">
                <div className="flex justify-between gap-x-64 shadow-lg rounded-lg p-1">
                    <p className="p-1">Name</p>
                    <p>{user?.user.name}</p>
                </div>
                <div className="flex justify-between gap-x-64 shadow-lg rounded-lg p-1">
                    <p className="p-1">E-Mail</p>
                    <p>{user?.user.email}</p>
                </div>
                <div className="flex justify-between gap-x-64 shadow-lg rounded-lg p-1">
                    <p className="p-1">Role</p>
                    <p>{user?.user.role}</p>
                </div>
                <div className="flex justify-between gap-x-64 shadow-lg rounded-lg p-1">
                    <p className="p-1">Two Factor Authentication</p>
                    <p>{user?.user.isTwoFactorEnabled as boolean ? "ON" :"OFF"}</p>
                </div>
            </div>
        </ServerCardWrapper>
    )
}