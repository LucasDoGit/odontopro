import prisma from "@/lib/prisma"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest){
    const { searchParams } = request.nextUrl;

    const userId = searchParams.get("userId");
    const dateParam = searchParams.get("date")

    if(!userId || userId === "null" || !dateParam || dateParam === "null"){
        return NextResponse.json({
            error: "Nenhum agendamento encontrado"
        }, {
            status: 400
        })
    }

    try {
        
        const [year, mount, day] = dateParam.split("-").map(Number)
        const startDate = new Date(year, mount -1, day, 0, 0, 0)
        const endDate = new Date(year, mount -1, day, 23, 59, 59, 999)

        console.log(startDate)
        console.log(endDate)

        return NextResponse.json({
            ok: true
        })

    } catch (error) {
        return NextResponse.json({
            error: "Erro ao buscar agendamentos"
        }, {
            status: 400
        })
    }
}