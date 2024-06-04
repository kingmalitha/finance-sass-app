import { z } from "zod";
import { Loader2 } from "lucide-react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { insertTransactionsSchema } from "@/db/schema";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransaction();

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
    createMutation.isPending ||
    accountMutation.isPending ||
    categoryMutation.isPending;

  const isLoading =
    categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Enter the details of the transaction you want to
            create.
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animation-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            categoryOptions={categoryOptions}
            accountOptions={accountOptions}
            onCreateCategory={onCreateCategory}
            onCreateAccount={onCreateAccount}
            disabled={isPending}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
