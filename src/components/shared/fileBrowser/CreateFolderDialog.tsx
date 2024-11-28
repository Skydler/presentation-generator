import { Input, VStack } from "@chakra-ui/react";
import {
  DialogHeader,
  DialogRoot,
  DialogContent,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
  DialogFooter,
  DialogActionTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Field } from "../../ui/field";
import { useForm } from "react-hook-form";

export type NewFolderForm = {
  folderName: string;
};

type CreateFolderDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  createFolder: (data: NewFolderForm) => void;
};
export function CreateFolderDialog({ open, setOpen, createFolder }: CreateFolderDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewFolderForm>();
  const newFolderSubmit = (data: NewFolderForm) => {
    createFolder(data);
  };
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogContent>
        <form onSubmit={handleSubmit(newFolderSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a new folder</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack gap="4">
              <Field label="Folder name" invalid={!!errors.folderName} errorText={errors.folderName?.message}>
                <Input
                  placeholder="Folder"
                  {...register("folderName", {
                    required: "Folder name is required",
                  })}
                />
              </Field>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button type="submit">Save</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
