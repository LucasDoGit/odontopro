"use server"

import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";
import { Session } from "next-auth";
import { getPlan } from "./get-plans";
import { PLANS } from "../plans";
import { checkSubscriptionExpired } from "./check-subscription-expired";
import { ResultPermissionProps } from "./can-permission";

export async function canCreateService(subscription: Subscription | null, session: Session): Promise<ResultPermissionProps>{

    try {
        const serviceCount = await prisma.service.count({
            where: {
                userId: session.user.id,
                status: true,
            }
        })

        if(subscription && subscription.status === "active"){
            const plan = subscription.plan

            const planLimits = await getPlan(plan);

            console.log("limites do seu plano", planLimits)

            return {
                hasPermission: planLimits.maxServices === null || serviceCount < planLimits.maxServices,
                planId: subscription.plan,
                expired: false,
                plan: PLANS[subscription.plan],
            }
        }

        const checkTestLimit = await checkSubscriptionExpired(session);

        return checkTestLimit

    } catch (error) {
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: false,
            plan: null,
        }
    }

}