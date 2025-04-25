"use client"

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

export function ScheduleContent({ clinic }: ScheduleContentProps){

    const form = useAppointmentForm();

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
                    <form className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm">
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


                    </form>
                </Form>
            </section>

        </div>
    )
}