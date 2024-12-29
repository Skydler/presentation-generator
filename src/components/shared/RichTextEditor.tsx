import { HStack } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const extensions = [StarterKit];

type RichTextEditorProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function RichTextEditor({ value, placeholder, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions,
    onUpdate: (content) => onChange(content.editor.getHTML()),
  });

  useEffect(() => {
    editor?.commands.setContent(value || placeholder);
  }, [editor, value, onChange, placeholder]);

  return (
    <>
      <HStack>Fixed menu</HStack>
      <EditorContent
        editor={editor}
        style={{
          width: "700px",
          border: "1px solid #e4e4e7",
          borderRadius: "4px",
        }}
      />
    </>
  );
}
