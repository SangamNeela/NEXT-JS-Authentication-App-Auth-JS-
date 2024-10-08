import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import Navbar from "./_components/Navbar"
import { Toaster } from "sonner"
export default async function SettingsLayout({children}:{children:React.ReactNode}){
    const session = await auth()
    return(
        
        <SessionProvider session={session}>
        <Toaster />
        <div className="p-10  w-full flex  flex-col items-center justify-center bg-gradient-to-r from-indigo-500">
                <Navbar/>
                <div className="h-screen w-min-[350px] sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    {children}
                </div>
        </div>
        </SessionProvider>
        
    )
}