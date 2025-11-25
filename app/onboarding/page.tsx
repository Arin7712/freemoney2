import OnboardingForm from '@/components/forms/OnboardingForm'
import { createUser } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs/server';

const Page = async() => {

    const user = await currentUser();
    return (
    <div className='flex items-center justify-center h-screen'>
      <OnboardingForm userId={user?.id || ''} createUserAction={createUser}/>
    </div>
  )
}

export default Page
