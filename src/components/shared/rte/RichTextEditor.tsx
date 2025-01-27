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
import Compressor from "compressorjs";

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
            new Compressor(file, {
              quality: 0.6,
              success(result) {
                const reader = new FileReader();

                reader.onloadend = () => {
                  if (typeof reader.result !== "string") return;
                  currentEditor
                    .chain()
                    .insertContentAt(pos, {
                      type: "image",
                      attrs: {
                        src: reader.result,
                      },
                    })
                    .focus()
                    .run();
                };

                reader.readAsDataURL(result);
              },
              error(err) {
                console.error(err.message);
              },
            });
          });
        },
        onPaste: (currentEditor, files) => {
          files.forEach((file) => {
            new Compressor(file, {
              quality: 0.6,
              success(result) {
                const reader = new FileReader();

                reader.onloadend = () => {
                  if (typeof reader.result !== "string") return;
                  currentEditor
                    .chain()
                    .insertContentAt(currentEditor.state.selection.anchor, {
                      type: "image",
                      attrs: {
                        src: reader.result,
                      },
                    })
                    .focus()
                    .run();
                };

                reader.readAsDataURL(result);
              },
              error(err) {
                console.error(err.message);
              },
            });
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
    <VStack gap={0} border="1px solid #e4e4e7" borderRadius="sm" width="full" maxWidth="700px">
      <FixedMenu editor={editor} />
      <EditorContent
        editor={editor}
        style={{
          width: "100%",
        }}
      />
    </VStack>
  );
}
