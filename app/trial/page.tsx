import CameraPayment from '@/components/CameraPayment'
import Transaction from '@/components/Transaction'
import React from 'react'

const Page = () => {
  return (
    <div>
      {/* <Transaction/> */}
      <CameraPayment data={{name: 'Arin', amount: 1000, bank: 'State Bank of India', toUpi: 'abc@oksbi', fromName: 'Google Pay •', fromUpi: 'google-pay-id'}}/>
    </div>
  )
}

export default Page
