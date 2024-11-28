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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";

export type NewFileForm = {
  filename: string;
  title: string;
  description: string;
};

type CreateFileDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  createFile: (data: NewFileForm) => void;
};
export function CreateFileDialog({
  open,
  setOpen,
  createFile,
}: CreateFileDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewFileForm>();
  const newFileSubmit = (data: NewFileForm) => {
    createFile(data);
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogContent>
        <form onSubmit={handleSubmit(newFileSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a new file</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack gap="4">
              <Field
                label="File name"
                invalid={!!errors.filename}
                errorText={errors.filename?.message}
              >
                <Input
                  placeholder="Buenos Aires"
                  {...register("filename", {
                    required: "Filename is required",
                  })}
                />
              </Field>
              <Field
                label="Title"
                invalid={!!errors.title}
                errorText={errors.title?.message}
              >
                <Input
                  placeholder="La gran provincia"
                  {...register("title", { required: "Title is required" })}
                />
              </Field>
              <Field
                label="Description"
                invalid={!!errors.description}
                errorText={errors.description?.message}
              >
                <Input
                  placeholder="La gran provincia de Buenos Aires"
                  {...register("description", {
                    required: "Description is required",
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
