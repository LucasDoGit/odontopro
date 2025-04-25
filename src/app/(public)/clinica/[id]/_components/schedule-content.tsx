"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import imgTest from '../../../../../../public/foto1.png'
import { MapPin } from "lucide-react"
import { Prisma } from "@prisma/client"
import { useAppointmentForm, AppointmentFormData } from "./schedule-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { formatPhone } from "@/utils/formatPhone"
import { DateTimePicker } from "./date-picker-"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true
    }
}>

interface ScheduleContentProps {
    clinic?: UserWithServiceAndSubscription
}

interface TimeSlot {
    time: string;
    available: boolean;
}

export function ScheduleContent({ clinic }: ScheduleContentProps){
    const [selectedTime, setSelectedTime] = useState("");
    const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const [blocketTimes, setBlockedTimes] = useState<string[]>([]);

    const form = useAppointmentForm();
    const { watch } = form;

    const selectedDate = watch("date");
    const selectedServiceId = watch("serviceId");

    const fetchBlockedTimes = useCallback(async (date: Date): Promise<string[]> => {
        setLoadingSlots(true);
        try {
            const dateString = date.toISOString().split("T")[0]
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic?.id}&date=${dateString}`)

            return []
        } catch (error) {
            console.log(error)
            setLoadingSlots(false)
            return [];
        }
    }, [clinic?.id])

    async function handleRegisterAppointment(formData: AppointmentFormData){
        console.log(formData)
    }

    useEffect(() => {

        if(selectedDate){
            fetchBlockedTimes(selectedDate).then((blocked) => {
                console.log("horários reservados", blocked)
            })
        }

    }, [selectedDate, selectedServiceId, clinic?.times, fetchBlockedTimes])

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500" />

            <section className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <article className="flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white -mt-16 mb-8">
                            <Image 
                                src={clinic?.image ? clinic.image : imgTest}
                                alt="Foto da clinica"
                                className="object-cover"
                                fill
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">
                            {clinic?.name}
                        </h1>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-5 h-5" />
                            <span>{clinic?.address ? clinic.address : "Endereço não informado"}</span>
                        </div>
                    </article>
                </div>
            </section>

            <section className="max-w-2xl mx-auto w-full mt-6">
                <Form {...form}>
                    <form 
                        className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm"
                        onSubmit={form.handleSubmit(handleRegisterAppointment)}
                        >
                        <FormField
                            control={form.control}
                            name="name"
                            render={ ({ field }) => (
                                <div>
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Nome completo:</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                placeholder="Digite seu nome completo..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={ ({ field }) => (
                                <div>
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="Digite seu email..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={ ({ field }) => (
                                <div>
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Telefone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="phone"
                                                placeholder="(XX) XXXX-XXXX"
                                                onChange={ (e) => {
                                                    const formattedValue = formatPhone(e.target.value)
                                                    field.onChange(formattedValue)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={ ({ field }) => (
                                <div>
                                    <FormItem className="flex items-center gap-2 space-y-1">
                                        <FormLabel className="font-semibold">Data do agendamento:</FormLabel>
                                        <FormControl>
                                            <DateTimePicker
                                                initialDate={new Date()}
                                                className="w-full rounded border p-2"
                                                onChange={(date) => {
                                                    if(date){
                                                        field.onChange(date)
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="serviceId"
                            render={ ({ field }) => (
                                <div>
                                    <FormItem className="">
                                        <FormLabel className="font-semibold">Serviço</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="selecione um serviço" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {clinic?.services.map((service) => (
                                                        <SelectItem key={service.id} value={service.id}>
                                                            {service.name} - {Math.floor(service.duration / 60)}h {service.duration % 60}m
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />

                        {clinic?.status ? (
                            <Button 
                                className="w-full bg-emerald-500 hover:bg-emerald-400"
                                type="submit"
                                disabled={!watch("name") || !watch("email") || !watch("phone") || !watch("date")}
                            >
                                Realizar agendamento
                            </Button>
                        ) : (
                            <p className="bg-red-500 text-white text-center px-4 py-2 rounded">A Clínica está fechada neste momento</p>
                        )}


                    </form>
                </Form>
            </section>

        </div>
    )
}