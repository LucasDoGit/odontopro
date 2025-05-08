import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";
import { getProfessionals } from "./_data_acess/get-professionals";

export const revalidate = 120;

export default async function Home() {

  const professional = await getProfessionals();

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      
      <div>
        <Hero/> 

        <Professionals professionals={professional || []} />

        <Footer/>
      </div>
    </div>    
  );
}
