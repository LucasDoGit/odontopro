"use client"
import { useState } from "react";
import Link from "next/link";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet" 
import { Button } from "@/components/ui/button"
import { LogIn, Menu, UserCog } from "lucide-react";
import { useSession } from "next-auth/react";
import { handleRegister } from "../../_actions/login";

export function Header(){
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();

    const navItems = [
        { href: "#profissionais", label: "Profissionais"},
        
    ]

    async function handleLogin(){
        await handleRegister("google", false)
    }

    async function handleDemoLogin(){
        await handleRegister("credentials", true)
    }

    const NavLinks = () => (
        <>
            {navItems.map((item) => (
                <Button
                    key={item.href}
                    asChild
                    className="bg-transparent hover:bg-transparent text-black shadow-none"
                    onClick={() => setIsOpen(false)}
                >
                    <Link href={item.href} className="text-base">{item.label}</Link>
                </Button>
            ))}

            {status === 'loading' ? (
                <></>
            ) : session ? (
                <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 font-medium bg-zinc-900 text-white py-1 rounded-md px-4"
                >
                    Acessar clínica
                </Link>
            ) : (
                <div className="flex gap-2">
                    <Button onClick={handleLogin}>
                        <LogIn/>
                        Fazer Login
                    </Button>
                    <Button onClick={handleDemoLogin} className="bg-emerald-500 hover:bg-emerald-400">
                        <UserCog/>
                        Login Demo
                    </Button>
                </div>
            )}
        </>
    )

    return(
        <header 
            className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white"
        >
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/"
                    className="text-3xl font-bold text-zinc-900"
                >
                Odonto<span className="text-emerald-500">PRO</span>
                </Link>

                <nav
                    className="hidden md:flex items-center space-x-4"
                >
                    <NavLinks/> 
                </nav>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            className="text-black hover:bg-transparent"
                            variant="ghost"
                            size="icon"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-[240px] sm:w-[300px] z-[9999]">
                            <SheetTitle>Menu</SheetTitle>
                            <SheetHeader></SheetHeader>

                            <SheetDescription>
                                Veja nossos links
                            </SheetDescription>
                            
                            <nav className="flex flex-col space-y-4 mt-6">
                                <NavLinks/>
                            </nav>

                        </SheetContent>
                </Sheet>

            </div>
        </header>
    )
}