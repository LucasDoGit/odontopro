"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache";

interface UpdateAvatarUrlProps {
    avatarUrl: string;
}

export async function updateProfileAvatar({ avatarUrl }: UpdateAvatarUrlProps){

    const session = await auth();

    if(!session?.user.id){
        return {
            error: "Usuário não encontrado"
        }
    }

    if(!avatarUrl){
        return {
            error: "Erro ao atualizar imagem do avatar"
        }
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                image: avatarUrl
            }
        })

        if(!user){
            return {
                error: "Erro ao atualiar image do avatar"
            }
        }

        revalidatePath("/dashboard/profile")

        return {
            data: "Imagem do avatar atualizada com sucesso!"
        }
    } catch (error) {
        return {
            error: "Erro ao atualiar image do avatar"
        }
    }
    
}