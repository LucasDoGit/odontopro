"use server"

import prisma from "@/lib/prisma"

export async function getAllServices({userId}: { userId: string}){
    
    if(!userId){
        return { error: "Falha ao buscar serviços" }
    }

    try {
        const response = await prisma.service.findMany({
            where: {
                userId: userId,
                status: true
            }
        })

        return {
            data: response || []
        };
    } catch (error) {
        return { error: "Falha ao buscar serviços" }
    }
}