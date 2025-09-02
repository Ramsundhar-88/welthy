import { getUSerAcccounts } from '@/actions/dashboard'
import CreateAccountDrawer from '@/components/create-account-drawer'
import { CardContent,Card} from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'
import AccountCard from './_components/account-card'


async function Dashboard() {
  const accounts = await getUSerAcccounts()
  return (
    <div className='px-5'>

    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <CreateAccountDrawer>
        <Card className="hover:shadow-md transition-shadwo cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
            <Plus className="h-10 w-10 mb-2"/>
            <p className='text-sm font-medium'>Add new Account</p>

          </CardContent>
        </Card>
      </CreateAccountDrawer>

      {accounts.length > 0 && accounts?.map((account)=>{
        return <AccountCard key={account.id} account={account}/>
      })}
    </div>
    
    
    
    </div>












    
  )
}

export default Dashboard
