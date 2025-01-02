import { useState } from "react";
import { Box, Fieldset, Input } from "@chakra-ui/react";
import { Attraction } from "../../pages/PdfGenerator";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { RichTextEditor } from "./rte/RichTextEditor";

type AttractionsListProps = { updatePage: (attraction: Attraction) => void };
export function AttractionEditor({ updatePage }: AttractionsListProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext<Attraction>();
  // We need to store the description in a separate state so RichTextEditor works as expected
  // I found an issue with the undo and redo buttons not working as expected
  // The issue I encountered has something to do with the rerendering of the component probabbly but
  // I couldn't find the root cause
  const [description, setDescription] = useState("");
  const onSubmit: SubmitHandler<Attraction> = (data) => updatePage({ ...data, description: description });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Fieldset.Legend fontSize="lg">Edit attraction</Fieldset.Legend>
          <Fieldset.Content>
            <Field label="Title" invalid={!!errors.title} errorText={errors.title?.message}>
              <Input {...register("title")} />
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
          </Fieldset.Content>
          <Button type="submit">Update</Button>
        </Fieldset.Root>
      </form>
    </Box>
  );
}
