"use client"
import { useUser } from "@/hooks/useUser"
import { Card,CardContent,CardHeader } from "@/components/ui/card"
import SettingsForm from "../_components/settings-form"
export default function Settings(){
    const session = useUser()
    return (
            <Card className="mt-4">
                <CardHeader>
                    🖇️Settings
                </CardHeader>
                <CardContent className="">
                    <SettingsForm/>
                </CardContent>
            </Card>
    )
}