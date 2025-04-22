"use client"
import { useState } from "react"
import { DialogServiceFormData, useDialogServiceForm } from "./dialog-service-form"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { createNewService } from "../_actions/create-service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { convertRealToCents } from "@/utils/convertCurrency"

interface DialogServiceProps {
    closeModal: () => void;
    serviceId?: string;
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    }
}

export function  DialogService({ closeModal, serviceId, initialValues }: DialogServiceProps){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useDialogServiceForm({ initialValues: initialValues })

    async function onSumbit(values: DialogServiceFormData){
        setLoading(true);
        const priceInCents = convertRealToCents(values.price)
        const hours = parseInt(values.hours) || 0;
        const minutes = parseInt(values.minutes) || 0; 

        const duration = (hours * 60) + minutes;

        const response = await createNewService({
            name: values.name,
            duration: duration,
            price: priceInCents
        })

        setLoading(false);

        if(response?.error){
            toast.error(response.error)
            return;
        }

        toast.success("Serviço adicionado com sucesso!")
        handleCloseModal();
        router.refresh()
    }

    async function editServiceById({ serviceId, name, priceInCents, duration }: { serviceId: string, name: string, priceInCents: number, duration: number }){

    }

    function handleCloseModal(){
        form.reset();
        closeModal();
    }

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>){
        let { value } = event.target;

        value = value.replace(/\D/g, '');

        if(value){
            value = (parseInt(value, 10) / 100).toFixed(2);
            value = value.replace('.', ',');
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        event.target.value = value;

        form.setValue("price", value)
    }

    return(
        <>
            <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
                <DialogDescription>
                    Adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form 
                    className="space-y-2"
                    onSubmit={form.handleSubmit(onSumbit)}
                >
                    
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={ ({ field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Nome do serviço
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} 
                                            placeholder="Digite o nome do serviço"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={ ({ field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Valor do serviço
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} 
                                            onChange={changeCurrency}
                                            placeholder="Digite o valor do serviço"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p className="font-semibold text-sm pt-2">Tempo de duranção do serviço</p>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="hours"
                                render={ ({ field}) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">
                                            horas
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} 
                                                placeholder="1"
                                                min="0"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="minutes"
                                render={ ({ field}) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">
                                            minutos
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} 
                                                placeholder="0"
                                                min="0"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full font-semibold text-white"
                        disabled={loading}
                        >
                            {loading ? "Carregando..." : `${serviceId ? "Atualizar Serviço" : "Adicionar Serviço"}`}
                    </Button>
                </form>
            </Form>
        </>
    )
}