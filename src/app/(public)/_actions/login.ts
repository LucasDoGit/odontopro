"use server"

import { signIn } from "@/lib/auth"

type LoginType = "google" | "github" | "credentials"

export async function handleRegister(provider: LoginType, demo: boolean){
    await signIn(provider, { redirectTo: '/dashboard', demo: demo })
}