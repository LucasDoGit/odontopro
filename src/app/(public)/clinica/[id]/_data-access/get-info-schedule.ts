"use server"
import prisma from "@/lib/prisma"

export async function getInfoSchedule({ userId }: { userId: string }) {
    
    try {
        
        if(!userId){
            return { error: "Falha ao buscar dados do usuário" }
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                subscription: true,
                services: {
                    where: {
                        status: true
                    }
                }
            }
        })

        if(!user){
            return { error: "Falha ao buscar dados do usuário" }
        }

        return {
            data: user
        };

    } catch (error) {
        return { error: "Falha ao buscar dados do usuário" }
    }
}