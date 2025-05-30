"use server"

import prisma from "@/lib/prisma"

export async function getDemoUser(){

    try {
        
        const user = await prisma.user.findFirst({
            where: {
                email: "demo@demo.com"
            }
        })

        if(!user){
            return null;
        }

        return user;
    } catch (error) {
        return null
    }
}