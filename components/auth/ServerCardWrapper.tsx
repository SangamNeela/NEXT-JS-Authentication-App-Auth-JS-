import { Card,CardContent,CardHeader,CardFooter } from "../ui/card";
interface CardProps{
    children:React.ReactNode,
    headerLabel:String
}
export default function ServerCardWrapper({children,headerLabel}:CardProps){
    return(
        <Card className= " bg-slate-300 mt-4">
            <CardHeader>
                <h3 className="text-center">💻 {headerLabel}</h3>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                {/* TODO inFOOTER */}
            </CardFooter>
        </Card>
    )
}