"use client"

import { Textarea } from "@/components/ui/textarea";
import { ReminderFormData, useReminderForm } from "./reminder-form"
import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Button } from "@/components/ui/button";
import { createReminder } from "../../_actions/create-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderContentProps {
    closeDialog: () => void;
}

export function ReminderContent({ closeDialog }: ReminderContentProps){
    const router = useRouter();
    const form = useReminderForm();

    async function onSubmit(formData: ReminderFormData){

        const response = await createReminder({ description: formData.description })

        if(response.error){
            toast.error(response.error)
            return
        }

        toast.success(response.data)
        router.refresh();
        closeDialog();
    }

    return(
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form 
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Descreva o lembrete:</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Digite o nome do lembrete..."
                                        className="max-h-52"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={!form.watch("description")}
                    >
                        Cadastrar
                    </Button>
                </form>
            </Form>
        </div>
    )
}