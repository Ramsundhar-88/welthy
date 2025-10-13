import React, { Suspense } from 'react'
import DashBoard from './page'
import {BarLoader} from "react-spinners"
import { auth } from '@clerk/nextjs'

const Dashboardlayout = () => {
  return (
    <div className='px-5'>
         <h1 className='text-6xl font-bold mb-5'>Dashboard</h1>
         <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color="#9333ea"/>}>
            <DashBoard/>
         </Suspense>
         
      
    </div>
  )
}

export default Dashboardlayout
