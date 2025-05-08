import getSession from '@/lib/getSession';
import { redirect } from "next/navigation";
import { getUserData } from './_data-acess/get-info-user';
import { ProfileContent } from './_components/profile';
import { LoadingSuspense } from '../_components/loading-suspense';
import { Suspense } from 'react';

export default async function Profile(){
    const session = await getSession();

    if(!session){
        redirect("/")
    }

    const user = await getUserData({userId: session.user?.id})

    if(!user){
        redirect('/')
    }

    return(
        <Suspense fallback={<LoadingSuspense />}>
            <ProfileContent user={user} />
        </Suspense>
    )
}