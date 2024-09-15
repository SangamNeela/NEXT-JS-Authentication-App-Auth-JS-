
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
                <div className="flex justify-between shadow-lg rounded-lg p-1">
                    <p className="p-1">Name</p>
                    <p className="p-1 flex flex-wrap">{user?.user.name}</p>
                </div>
                <div className="flex justify-between items-center flex-wrap gap-y-6 shadow-lg rounded-lg p-1">
                    <p className="p-1">E-Mail</p>
                    <p className="p-1">{user?.user.email}</p>
                </div>
                <div className="flex justify-between  shadow-lg rounded-lg p-1">
                    <p className="p-1">Role</p>
                    <p className="p-1">{user?.user.role}</p>
                </div>
                <div className="flex justify-between shadow-lg rounded-lg p-1">
                    <p className="p-1">Two Factor Authentication</p>
                    <p className="p-1">{user?.user.isTwoFactorEnabled as boolean ? "ON" :"OFF"}</p>
                </div>
            </div>
        </ServerCardWrapper>
    )
}