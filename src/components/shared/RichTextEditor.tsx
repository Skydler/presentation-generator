import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

type RichTextEditorProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};
export function RichTextEditor({ value, placeholder, onChange }: RichTextEditorProps) {
  const { quill, quillRef } = useQuill({ placeholder });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(value);
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, value, onChange]);

  return <Box ref={quillRef} width="100%" />;
}
