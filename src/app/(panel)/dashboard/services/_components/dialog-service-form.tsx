import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    price: z.string().min(1, { message: "O preço é obrigatório"}),
    hours: z.string(),
    minutes: z.string(),
})

export interface UseDialogServiceFormProps {
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    }
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm(){
    return useForm<DialogServiceFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: "",
            minutes: "",
            hours: ""
        }
    })
}