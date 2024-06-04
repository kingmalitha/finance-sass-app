"use client";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";

import { columns } from "@/app/(dashboard)/transactions/columns";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

export default function TransactionsPage() {
  const newTransaction = useNewTransaction();
  const deleteTransaction = useBulkDeleteTransactions();
  const {
    data: transactions,
    isLoading: transactionsLoading,
  } = useGetTransactions();

  const isDisabled =
    deleteTransaction.isPending || transactionsLoading;

  if (transactionsLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt 24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>

          <CardContent className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions
          </CardTitle>
          <Button size="sm" onClick={newTransaction.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions || []}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransaction.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
