import { Fieldset, Input, Textarea, VStack } from "@chakra-ui/react";
import { Attraction } from "@/pages/PdfGenerator";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

type AttractionsListProps = { updatePage: (attraction: Attraction) => void };
export function AttractionEditor({ updatePage }: AttractionsListProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Attraction>();
  const onSubmit: SubmitHandler<Attraction> = (data) => updatePage(data);

  return (
    <VStack gap={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Fieldset.Legend>Edit attraction</Fieldset.Legend>
          <Fieldset.Content>
            <Field
              label="Title"
              invalid={!!errors.title}
              errorText={errors.title?.message}
            >
              <Input
                {...register("title", { required: "Title is required" })}
              />
            </Field>
            <Field
              label="Description"
              invalid={!!errors.description}
              errorText={errors.description?.message}
            >
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </Field>
          </Fieldset.Content>
          <Button type="submit">Update</Button>
        </Fieldset.Root>
      </form>
    </VStack>
  );
}
