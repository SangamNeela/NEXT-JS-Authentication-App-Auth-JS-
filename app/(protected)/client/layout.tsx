export default async function ClientLayout({children}:{children:React.ReactNode}){
    return(
        
        <div className="h-screen w-full">
            {children}
        </div>
        
    )
}