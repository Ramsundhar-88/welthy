import { getAccountWithTransactions } from '@/actions/account'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'
import TranscationTable from '../_components/transcation-table'
import { AccountChart } from '../_components/account-chart'

const AccountPage = async ({ params }) => {
  const accountId = params?.id; // safe access
  if (!accountId) return notFound();

  const accountData = await getAccountWithTransactions(accountId);
  if (!accountData) return notFound();

  const { transactions, ...account } = accountData;




  return (
    <div className='space-y-8 px -5 '>
        <div className='flex gap-4 items-end justify-between'>

        <div>
            <h1 className='text-5xl sm:text-6xl font-bold mb-5 capitalize'>{account.name}</h1>
            <p className='text-muted-foreground 4xl'>{account.type.charAt(0)+account.type.slice(1).toLowerCase()}</p>
        </div>

        <div className='text-right pb-2'>
            <div className='text-xl sm:text-2xl font-bold'>${parseFloat(account.balance).toFixed(2)}</div>
            <p className='text-sm text-muted-foreground'> {account._count.transcations} Transcations</p>

        </div>

        </div>
        {/* chartsection */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>








        {/* Transcation table */}
        <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea'/>}>

            <TranscationTable transactions={transactions}/>
        </Suspense>





    </div>



      
    
  )
}

export default AccountPage
