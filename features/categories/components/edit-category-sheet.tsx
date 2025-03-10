import { z } from "zod";

import { CategoryForm } from "@/features/categories/components/category-form";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useGetCategory } from "@/features/categories/api/use-get-category";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { insertCategoriesSchema } from "@/db/schema";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category! This action is irreversible."
  );

  const categoryQuery = useGetCategory(id);

  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading;

  const isPending =
    editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              Edit an existing category to organize your
              transactions.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
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

export default EditCategorySheet;
