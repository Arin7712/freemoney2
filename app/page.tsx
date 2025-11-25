import React from 'react'
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const page = () => {
  return (
    <div>
      <h1>Home</h1>
      <Button asChild>
        <Link href="/sign-in">Get Started</Link>
      </Button>
    </div>
  )
}

export default page
