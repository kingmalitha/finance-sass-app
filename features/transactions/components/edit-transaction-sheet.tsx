import { z } from "zod";

import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { insertTransactionsSchema } from "@/db/schema";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction! This action is irreversible."
  );

  const transactionQuery = useGetTransaction(id);

  const editTransactionMutation = useEditTransaction(id);
  const deleteTransactionMutation =
    useDeleteTransaction(id);

  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();

  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });

  const categoryOptions = (categoryQuery.data ?? []).map(
    (category) => ({
      label: category.name,
      value: category.id,
    })
  );

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const accountOptions = (accountQuery.data ?? []).map(
    (account) => ({
      label: account.name,
      value: account.id,
    })
  );

  const isPending =
    editTransactionMutation.isPending ||
    deleteTransactionMutation.isPending;
  accountMutation.isPending || categoryMutation.isPending;

  const isLoading =
    categoryQuery.isLoading ||
    accountQuery.isLoading ||
    transactionQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editTransactionMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteTransactionMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Edit an existing transaction to update your
              transactions.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              defaultValues={defaultValues}
              disabled={isPending}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransactionSheet;
