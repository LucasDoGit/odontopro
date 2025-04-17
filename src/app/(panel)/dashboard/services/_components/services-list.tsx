"use client"
import { useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogService } from "./dialogService";

export function ServicesList(){
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <section className="mx-auto">

                <Card className="py-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-2">
                        <CardTitle className="text-xl md:text-2xl font-bold">Serviços</CardTitle>
                            <DialogTrigger asChild> 
                                <Button>
                                    <Plus className="w-4 h-4"/>
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogService 
                                    closeModal={() => {setIsDialogOpen(false)}}
                                />
                            </DialogContent>
                    </CardHeader>
                </Card>

            </section>
        </Dialog>
    )
}