import React from 'react'
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const page = () => {
  return (
    <div>
      Home
        <SignOutButton/>
        <Link href="/sign-in">Get Starteed</Link>
    </div>
  )
}

export default page
