"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const formSchema = z.object({
    serviceId: z.string().min(1, { message: "O ID do serviço é obrigatório"}),
    name: z.string().min(1, { message: "O nome do serviço é obrigatório"}),
    price: z.number().min(1, { message: "O valor do serviço é obrigatório "}),
    duration: z.number(),
})

type FormSchema = z.infer<typeof formSchema>

export async function updateServiceById(formData: FormSchema){
    const session = await auth();

    if(!session?.user?.id){
        return {
            error: "Falha ao cadastrar serviço",
        }
    }

    const schema = formSchema.safeParse(formData);

    if(!schema.success){
        return {
            error: schema.error.issues[0].message
        }
    }

    try {
        await prisma.service.update({
            where: {
                id: formData.serviceId,
                userId: session?.user?.id
            },
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration < 30 ? 30 : formData.duration,
            }
        })

        revalidatePath("/dashboard/services")

        return {
            data: "Serviço atualizado com sucesso!"
        }
    } catch (error) {
        return {
            error: "Falha ao cadastrar serviço"
        }
    }
}