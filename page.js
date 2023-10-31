"use client";
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { data } from 'autoprefixer';

function Home() {
  console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
  return (
    <div className='h-screen bg-slate-950 flex justify-center items-center'>
      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      }}>
        <PayPalButtons 
        style={{
          color:"blue",
          label:"pay"
        }} 
        createOrder={async() => {
          const res = await fetch('/api/checkout',{
            method: "POST"
          })
          const order = await res.json()
          console.log(order)
          return order.id
        }}
        onApprove={(data,actions) => {
          console.log(data)
          actions.order.capture()
        }}
        onCancel={(data) => {
          console.log("Cancelling order", data)
        }}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default Home