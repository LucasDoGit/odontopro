import { LabelSubscription } from "@/components/ui/label-subscriptrion";
import { getAllServices } from "../_data-acess/get-all-services";
import { ServicesList } from "./services-list";
import { canPermission } from "@/utils/permissions/can-permission";

interface ServicesContentProps {
    userId: string;
}

export async function ServiceContent({ userId }: ServicesContentProps){

    const services = await getAllServices({ userId: userId});
    const permissions = await canPermission({ type: "service" })

    console.log(permissions)

    return(
        <>
            {!permissions.hasPermission && (
                <LabelSubscription expired={permissions.expired} />
            )}
            <ServicesList services={services.data || []} permissions={permissions}/>
        </>
    )
}