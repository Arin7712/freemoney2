import React from 'react'
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Transaction from '@/components/Transaction';

const page = () => {
  return (
    <div className='bg-blackbro'>
      <h1>Home</h1>
      <Button asChild>
        <Link href="/sign-in">Get Started</Link>
      </Button>
      <Transaction/>
    </div>
  )
}

export default page
