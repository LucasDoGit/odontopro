import { redirect } from "next/navigation";
import { getPermissionUserToReports } from "./_data_acess/get-permission-reports";
import getSession from "@/lib/getSession";
import { LabelSubscription } from "@/components/ui/label-subscriptrion";


export default async function Reposts(){

    const session = await getSession()

    if(!session){
        redirect("/")
    }

    const user = await getPermissionUserToReports({ userId: session?.user.id! });

    if(!user){
        return(
            <main>
                <LabelSubscription expired={true} />
                <h1>Você não tem permissão para acessar essa página</h1>
                <p>Assine o plano <strong>PROFISSIONAL</strong> </p>
            </main>
        )
    }

    return(
        <main>
            <h1>Página de Relatórios</h1>
        </main>
    )

}