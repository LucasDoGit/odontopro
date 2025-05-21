import { Star } from "lucide-react";


export function PremiumBadge(){
    return (
        <div className="absolute top-2 right-2 bg-yellow-500 w-10 h-10 z-[2] rounded-full flex items-center justify-center">
            <Star className="text-white"/>
        </div>
    )
}