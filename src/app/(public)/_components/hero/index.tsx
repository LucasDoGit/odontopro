import Image from "next/image";
import { Button } from "@/components/ui/button";
import doctorImage from '../../../../../public/doctor-hero.png'

export function Hero(){
    return(
        <section className="bg-white">
            <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8 pb-4 sm:pb-0">
                
                <main className="flex items-center justify-center">
                    <article className="flex-[2] space-y-8 max-w-3xl flex flex-col justify-center">
                        
                        <h1 className="text-4xl lg:text-5xl font-bold max-w-2xl tracking-tight">Econtre os melhores profissionais em um único local!</h1>
                        
                        <p className="text-base md:text-lg text-gray-600">Nós somos uma plataforma para profissionais da saúde com foco em agilizar seu atendimento de forma simplificada e organizada.</p>
                        
                        <Button className="bg-emerald-500 hover:bg-emerald-400 w-fit px-6 font-semibold">
                            Encontre um clínica
                        </Button>
                    </article>

                    <div className="hidden lg:block">
                        <Image
                            alt="Foto ilustrativa profissional da saúde"
                            src={doctorImage}
                            width={340}
                            height={400}
                            className="object-contain"
                            quality={100}
                            priority={true}
                        />
                    </div>

                </main>

            </div>
        </section>
    )
}