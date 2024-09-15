"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { DropdownMenuDemo } from "./DropDown";
import { useRouter } from "next/navigation";
export default function Navbar(){
    const pathname=usePathname().toString();
    const router = useRouter();
    function handleServerClick(){
        router.push("/server");
        router.refresh();
    }
    return(
        <nav className="p-2 w-min-[350px] sm:w-[400px] md:w-[600px] bg-secondary rounded-lg flex flex-wrap-reverse gap-y-5 gap-x-20 justify-center ">
            <div >
                <div className="flex gap-x-2 ">
                    <Link href="/settings"><Button size={"sm"} variant={pathname==="/settings"?"outline":"default"}>Setting</Button></Link>     
                    <Link href="/admin"><Button size={"sm"} variant={pathname==="/admin"?"outline":"default"}>Admin</Button></Link>
                    <Link href="/client"><Button size={"sm"} variant={pathname==="/client"?"outline":"default"}>Client</Button></Link>
                    <Button onClick={handleServerClick} size={"sm"} variant={pathname==="/server"?"outline":"default"}>Server</Button>
                </div>
            </div>
            <DropdownMenuDemo/>
        </nav>

    )
} 