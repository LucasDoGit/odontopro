import { getAllServices } from "../_data-acess/get-all-services";
import { ServicesList } from "./services-list";

interface ServicesContentProps {
    userId: string;
}

export async function ServiceContent({ userId }: ServicesContentProps){

    const services = await getAllServices({ userId: userId});

    return(
        <div>
            <ServicesList services={services.data || []}/>
        </div>
    )
}