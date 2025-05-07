import { getTimesClinic } from "../../_data_access/get-times-clinic"
import { AppointmentsList } from "./appointments-list";


export async function Appointments({ userId }: { userId: string }){
    const { times } = await getTimesClinic({ userId: userId });

    return(
        
        <AppointmentsList times={times} />
    )
}