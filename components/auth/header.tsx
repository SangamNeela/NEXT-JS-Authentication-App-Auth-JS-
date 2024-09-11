
export function Header({label}:{label:string}){
    return(
        <div className="w-full flex flex-col items-center gap-y-3">
            <h1 className="text-3xl font-semibold">🔐Auth</h1>
            <p>{label}</p>
        </div>
    )
}