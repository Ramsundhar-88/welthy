import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transcation-form";
import { getTransaction } from "@/actions/transcation";

export default async function AddTransactionPage({ searchParams }) {
  // ✅ Await searchParams if your Next.js version requires it
  const params = await searchParams;
  const editId = params?.edit ?? null;

  const accounts = await getUserAccounts();

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-start mb-8">
        <h1 className="text-5xl">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
