export default async function ServerLayout({children}:{children:React.ReactNode}){
    return(
        
        <div className="h-screen w-full">
            {children}
        </div>
        
    )
}