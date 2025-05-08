import { LoaderCircle } from "lucide-react";

export function LoadingSuspense(){
    return(
        <div className="flex items-center justify-center w-full h-full">
            <LoaderCircle className="w-8 h-8 animate-spin" />
        </div>
    )
}