"use client"

import { useSearchParams } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Prisma } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Eye, X } from 'lucide-react'
import { cancelAppointment } from '../../_actions/cancel-appointment'
import { toast } from 'sonner'
import { 
    Dialog,
    DialogTrigger
} from '@/components/ui/dialog'
import { useState } from 'react'
import { DialogAppointment } from './dialog-appointment'
import { ButtonPickerAppointment } from './button-date'

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
    include: {
        service: true
    }
}>

interface AppointmentsListPros {
    times: string[]
}

export function AppointmentsList({ times }: AppointmentsListPros){
    const [detailAppointment, setDetailAppointment] = useState<AppointmentWithService | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    const date = searchParams.get("date")

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["get-appointments", date],
        queryFn: async () => {
            let activeDate = date;

            if(!date){
                const today = format(new Date(), "yyyy-MM-dd")
                activeDate = today;
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`

            const response = await fetch(url)

            const json = await response.json() as AppointmentWithService[];

            // console.log(json)

            if(!response.ok){
                return []
            }

            return json
        },
        staleTime: 20000, // 20 segundos para manter fresco
        refetchInterval: 60000 // 60 segundos revalida automaticamente        
        
    })

    const occupantMap: Record<string, AppointmentWithService> = {}

    if(data && data.length > 0){
        for( const appointments of data){

            const requiredSlots = Math.ceil(appointments.service.duration / 30);

            const startIndex = times.indexOf(appointments.time)

            if(startIndex !== -1){

                for(let i = 0; i < requiredSlots; i++){
                    const slotIndex = startIndex + i

                    if(slotIndex < times.length){
                        occupantMap[times[slotIndex]] = appointments
                    }
                }
            }
        }
    }

    async function handleCancelAppointment(appointmentId: string){
        const response = await cancelAppointment({ appointmentId: appointmentId })

        if(response.error){
            toast.error(response.data)
            return
        }

        queryClient.invalidateQueries({ queryKey: ["get-appointments"] })
        await refetch()
        toast.success(response.data)
    }

    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pt-3 pb-2'>
                    <CardTitle className='text-xl md:text-2xl font-bold'>
                        Agendamentos
                    </CardTitle>
                    
                    <ButtonPickerAppointment />
                </CardHeader>
                <CardContent>
                    <ScrollArea className='h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4'>
                        {isLoading ? (
                            <p>Carregando agenda...</p>
                        ): (
                            times.map((slot) => {
                                const occupant = occupantMap[slot]
                                if(occupant){
                                    return (
                                        <div
                                            key={slot}
                                            className='flex items-center py-2 border-t last:border-b'
                                        >
                                            <div className='w-16 text-sm font-semibold'>{slot}</div>
                                            <div className='flex-1 text-sm'>
                                                <div className='font-semibold'>{occupant.name}</div>
                                                <div className='text-sm text-gray-500'>
                                                    {occupant.phone}
                                                </div>
                                            </div>
                                            <div className='ml-auto'>
                                                <div className='flex'>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => setDetailAppointment(occupant)}
                                                        >
                                                            <Eye className='w-4 h-4' />
                                                        </Button>
                                                    </DialogTrigger>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleCancelAppointment(occupant.id)}
                                                    >
                                                        <X className='w-4 h-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                    key={slot}
                                    className='flex items-center py-2 border-t last:border-b'
                                    >
                                        <div className='w-16 text-sm font-semibold'>{slot}</div>
                                        <div className='flex-1 text-sm text-gray-500'>Disponível</div>
                                    </div>
                                )
                            })
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>

            <DialogAppointment 
                appointment={detailAppointment}  
            />
        </Dialog>
    )
}