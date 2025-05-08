
export type PlanDetailsProps = {
    maxServices: number;
}

export type PlansProps = {
    BASIC: PlanDetailsProps,
    PROFESSIONAL: PlanDetailsProps
}

export const PLANS: PlansProps = {
    BASIC: {
        maxServices: 3,
    },
    PROFESSIONAL:  {
        maxServices: 40,
    }
}

export const subscriptionPlans = [
    {
        id: "BASIC",
        name: "Basic",
        description: "Perfeito para clínicas menores",
        oldPrice: "R$ 97,90",
        price: "R$ 27,90",
        features: [
            `Até ${PLANS["BASIC"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte',
            'Relatórios',
        ]
    },
    {
        id: "PROFESSIONAL",
        name: "Profissional",
        description: "Ideal para clínicas grandes",
        oldPrice: "R$ 197,99",
        price: "R$ 97,90",
        features: [
            `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte prioritário',
            'Relatórios avançados',
        ]
    }
]