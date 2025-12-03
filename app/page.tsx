import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
      Home
      <Link href="/create">Create</Link>
    </div>
  )
}

export default Page
