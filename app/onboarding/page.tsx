import OnboardingForm from '@/components/forms/OnboardingForm'
import { createUser } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async() => {

    const user = await currentUser();
    return (
    <div>
      <OnboardingForm userId={user?.id || ''} createUserAction={createUser}/>
    </div>
  )
}

export default Page
