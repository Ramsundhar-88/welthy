import { getDashboardData, getUserAccounts } from '@/actions/dashboard'
import CreateAccountDrawer from '@/components/create-account-drawer'
import { CardContent, Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import AccountCard from './_components/account_card'
import { BudgetProgress } from './_components/budget-progress'
import { getCurrentBudget } from '@/actions/budget'
import { DashboardOverview } from './_components/transaction-overview'
import React, { Suspense } from 'react'

async function DashBoard() {
  const accounts = await getUserAccounts()

  // ✅ If user has no accounts → Show prompt to create one
  if (!accounts || accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 text-center">
        <p className="text-xl font-semibold text-muted-foreground">
          You don’t have any accounts yet!
        </p>

        <CreateAccountDrawer>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer w-[280px]">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-40">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Create your first account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>
    )
  }

  // ✅ If accounts exist → Show dashboard
  const defaultAccount = accounts.find((account) => account.isDefault)
  let budgetData = null
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id)
  }

  const transactions = await getDashboardData(defaultAccount?.id)

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      </Suspense>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2"/>
              <p className='text-sm font-medium'>Add new Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  )
}

export default DashBoard
