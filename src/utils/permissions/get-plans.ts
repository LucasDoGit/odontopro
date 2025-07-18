"use server"

import { Plan } from '@prisma/client'
import { PlanDetailsProps, PlansProps } from '../plans'

export interface PlanDetailInfo {
    maxServices: number;
}

const PLANS_LIMITS: PlansProps = {
    BASIC: {
        maxServices: 3,
    },
    PROFESSIONAL:  {
        maxServices: 40,
    }
}

export async function getPlan(planId: Plan){
    return PLANS_LIMITS[planId]
}