"use client"

import { use, useState } from 'react';
import Image from 'next/image';
import { ProfileFormData, useProfileForm } from './profile-form'
import { updateProfile } from '../_actions_/update-profile';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPhone } from '@/utils/formatPhone'
import { Prisma } from '@prisma/client'
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button';

import { Form, 
    FormControl, 
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import imgTeste from '../../../../../../public/foto1.png'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
    }
}>

interface ProfileContentProps {
    user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps){
    const [selectHours, setSelectedHours] = useState<string[]>(user.times ?? [])
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const { update } = useSession();
    const router = useRouter();

    const form = useProfileForm({ 
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone
    });

    function generateTimeSlots(): string[] {  
        const hours: string[] = [];

        for (let i = 8; i <= 24; i++){
            for(let j = 0; j < 2; j++){
                const hour = i.toString().padStart(2, "0")
                const minute = (j * 30).toString().padStart(2, "0")
                
                hours.push(`${hour}:${minute}`)
            }
        }

        return hours;
    }

    const hours = generateTimeSlots();

    function toggleHours(hour: string){
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort())
    }

    const timeZones = Intl.supportedValuesOf('timeZone').filter((zone) => 
        zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife")    ||
        zone.startsWith("America/Bahia")     ||
        zone.startsWith("America/Belem")     ||
        zone.startsWith("America/Manaus")    ||
        zone.startsWith("America/Cuiaba")    ||
        zone.startsWith("America/Boa_Vista") 
    )

    async function onSubmit(values: ProfileFormData){

        const response = await updateProfile({
            address: values.address,
            name: values.name,
            status: values.status === "active" ? true : false,
            timeZone: values.timeZone,
            phone: values.phone,
            times: selectHours || []
        })

        if(response.error){
            toast.error(response.error)
            return;
        }

        toast.success(response.data)
    }

    async function handleLogout() {
        await signOut();
        await update();

        router.replace('/')
    }
    
    return(
        <div className='mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className='py-5'>
                        <CardHeader>
                            <CardTitle>Meu Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <div className='flex justify-center'>
                                <div className='bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden'>
                                    <Image
                                        src={user.image ? user.image : imgTeste}
                                        alt='Foto da Clínica'
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            </div>

                            <div className='space-y-4'>
                            
                                <FormField 
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    placeholder='Digite o nome da clínica' 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    control={form.control}
                                    name='address'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Endereço completo</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    placeholder='Digite o endereço da clínica' 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    control={form.control}
                                    name='phone'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Telefone</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    placeholder="(12) 99567-8901" 
                                                    onChange={(e)=> {
                                                        const formatedValue = formatPhone(e.target.value)
                                                        field.onChange(formatedValue)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    control={form.control}
                                    name='status'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Status da Clínica</FormLabel>
                                            <FormControl>
                                                <Select 
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Selecione o status da clínica" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">ATIVO (Clínica aberta)</SelectItem>
                                                        <SelectItem value="inactive">INATIVO (Clínica fechada)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className='space-y-2'>
                                    <label className='font-semibold text-sm'>
                                        Configurar horários da clínica:


                                        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className='text-sm w-full justify-between'>
                                                    Clique aqui para selecionar horários
                                                    <ArrowRight className='w-5 h-5'/>
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Horários da clínica
                                                        <DialogDescription>
                                                            Selecione os horários de funcionamento da clínica
                                                        </DialogDescription>
                                                    </DialogTitle>
                                                </DialogHeader>

                                                <section className='py-4'>
                                                    <p className='text-sm text-muted-foreground mb-2'>
                                                        Clique nos horários abaixo para marcar ou desmarcar
                                                    </p>

                                                    <div className='grid grid-cols-5 gap-2'>
                                                        {hours.map((hour) => (
                                                            <Button 
                                                                key={hour}
                                                                variant="outline"
                                                                className={cn('h-10', selectHours.includes(hour) && 'border-2 border-emerald-500 text-primary')}
                                                                onClick={() => toggleHours(hour)}
                                                            >
                                                                {hour}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </section>

                                                <Button className='w-full' onClick={() => setDialogIsOpen(!dialogIsOpen)}>
                                                    Fechar modal
                                                </Button>

                                            </DialogContent>
                                        </Dialog>
                                    </label>

                                </div>

                                <FormField 
                                    control={form.control}
                                    name='timeZone'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Selecione o fuso horário</FormLabel>
                                            <FormControl>
                                                <Select 
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Selecione seu fuso horário" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZones.map((zone) => (
                                                            <SelectItem key={zone} value={zone}>
                                                                {zone}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type='submit'
                                    className='w-full bg-emerald-500 hover:bg-emerald-400'
                                >
                                    Salvar alterações
                                </Button>

                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>

            <section>
                <Button
                    className='mt-4'
                    variant={"destructive"}
                    onClick={handleLogout}
                >
                    Sair da conta
                </Button>
            </section>
        </div>
    )
}