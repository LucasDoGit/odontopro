import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServiceContent } from "./_components/service-content";
import { Suspense } from "react";
import { LoadingSuspense } from "../_components/loading-suspense";


export default async function Services(){

    const session = await getSession();
    
    if(!session){
        redirect("/")
    }
    
    return(
        <Suspense fallback={<LoadingSuspense/>}>
            <ServiceContent userId={session.user?.id!} />
        </Suspense>
    )
}