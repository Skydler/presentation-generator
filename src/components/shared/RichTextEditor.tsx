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
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const { quill, quillRef } = useQuill({ placeholder, modules });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(value);
      quill.on("text-change", () => {
        onChange(quill.getSemanticHTML());
      });
    }
  }, [quill, value, onChange]);

  return (
    <Box>
      <Box ref={quillRef} height={200} />
    </Box>
  );
}
