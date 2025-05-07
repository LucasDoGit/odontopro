import { 
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle
} from "@/components/ui/dialog"
import { AppointmentWithService } from "./appointments-list"
import { format } from "date-fns";
import { formatCurrency } from "@/utils/formatCurrency";

interface DialogAppointmentProps {
    appointment: AppointmentWithService | null;
}

export function DialogAppointment({ appointment } : DialogAppointmentProps){
    
    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Detalhes do paciente
                </DialogTitle>
                <DialogDescription>
                    Veja todos os detalhes do agendamento
                </DialogDescription>
            </DialogHeader>

            <div className="py-4">
                {appointment && (
                    <article>
                        <p><span className="font-semibold">Horário do agendado:</span> {appointment.time}</p>
                        <p><span className="font-semibold mb-2">Data do agendamento:</span> {format(appointment.appointmentDate, "dd/MM/yyyy")}</p>
                        <p><span className="font-semibold">Nome:</span> {appointment.name}</p>
                        <p><span className="font-semibold">Telefone:</span> {appointment.phone}</p>
                        <p><span className="font-semibold">Email:</span> {appointment.email}</p>

                        <section className="bg-gray-100 mt-4 p-2 rounded-md">
                            <p><span className="font-semibold">Serviço:</span> {appointment.service.name}</p>
                            <p><span className="font-semibold">Valor:</span> {formatCurrency(appointment.service.price / 100)}</p>
                        </section>

                    </article>
                )}
            </div>

        </DialogContent>
    )
}