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
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { RichTextEditor } from "../RichTextEditor";

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
export function CreateFileDialog({ open, setOpen, createFile }: CreateFileDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewFileForm>();

  const [description, setDescription] = useState("");
  const newFileSubmit = (data: NewFileForm) => {
    createFile({ ...data, description: description });
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
              <Field label="File name" invalid={!!errors.filename} errorText={errors.filename?.message}>
                <Input
                  placeholder="Buenos Aires"
                  {...register("filename", {
                    required: "Filename is required",
                  })}
                />
              </Field>
              <Field label="Title" invalid={!!errors.title} errorText={errors.title?.message}>
                <Input placeholder="La gran provincia" {...register("title")} />
              </Field>
              <Field label="Description" invalid={!!errors.description} errorText={errors.description?.message}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value } }) => (
                    <RichTextEditor onChange={setDescription} value={value} placeholder="Write something..." />
                  )}
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
