import { NextResponse } from "next/server"; 
import Stripe from "stripe";
import { stripe } from "@/utils/stripe"

export const POST = async(request: Request) => {

    const signature = request.headers.get("stripe-signature");

    if(!signature){
        return NextResponse.error();
    }

    console.log("webhook iniciando...")

    const text = await request.text()

    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_SECRET_WEBOOK_KEY as string,
    )

    switch(event.type){
        case "customer.subscription.deleted":
            const payment = event.data.object as Stripe.Subscription;

            console.log("Assinatura cancelada", payment)

            break;
        case "customer.subscription.updated":
            const paymentIntent = event.data.object as Stripe.Subscription;

            console.log("Assinatura atualizada", paymentIntent)
            break;
        case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            console.log("Assinatura criada", checkoutSession)
            break;

            default:
                console.log("Evento não tratado:", event.type)
    }

    return NextResponse.json({ recived: true })
}