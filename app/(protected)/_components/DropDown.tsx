import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CgProfile } from "react-icons/cg";
import { logout } from "@/actions/logout";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
export function DropdownMenuDemo() {

    async function handleLogout(){
        await logout();    
    }
    const user =useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {
            user?.image?<Image src={user.image} alt="" width={40} height={10} className="rounded-full"/>
            :
            <Button variant="outline"><CgProfile className="text-2xl"/></Button>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={handleLogout} variant={"outline"} className="w-full">Log out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
