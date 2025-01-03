import { useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { FixedMenu } from "./FixedMenu";
import { patchTipTapHTML } from "./utils";
import "./styles.css";
import { FontSize } from "./extensions/fontSize";
import TextStyle from "@tiptap/extension-text-style";

type RichTextEditorProps = { value: string; placeholder: string; onChange: (value: string) => void };
export function RichTextEditor({ value, placeholder, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    parseOptions: {
      preserveWhitespace: "full",
    },
    extensions: [
      StarterKit,
      Underline,
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder,
      }),
      ImageResize.configure({
        allowBase64: true,
        inline: true,
      }),
      Link.configure({
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      FileHandler.configure({
        allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
    ],
    onUpdate: (content) => {
      onChange(patchTipTapHTML(content.editor.getHTML()));
    },
  });

  useEffect(() => {
    if (!editor || !value) return;

    // Preserving position when setting content
    const { from, to } = editor.state.selection;
    editor.commands.setContent(value, false, { preserveWhitespace: "full" });
    editor.commands.setTextSelection({ from, to });
  }, [editor, value, onChange]);

  if (!editor) return;

  return (
    <VStack gap={0} border="1px solid #e4e4e7" borderRadius="sm">
      <FixedMenu editor={editor} />
      <EditorContent
        editor={editor}
        style={{
          width: "700px",
        }}
      />
    </VStack>
  );
}
