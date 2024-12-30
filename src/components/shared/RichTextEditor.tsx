import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { FixedMenu } from "./rte/FixedMenu";
import ImageResize from "tiptap-extension-resize-image";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import "./rte/styles.css";

type RichTextEditorProps = { value: string; placeholder: string; onChange: (value: string) => void };
export function RichTextEditor({ value, placeholder, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    parseOptions: {
      preserveWhitespace: "full",
    },
    extensions: [
      StarterKit,
      Underline,
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
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

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
    onUpdate: (content) => onChange(content.editor.getHTML()),
    //onUpdate: (content) => console.log(content.editor.getHTML()),
  });

  useEffect(() => {
    if (!editor || !value) return;

    // Preserving position when setting content in a controlled manner with ReactHookForm
    const { from, to } = editor.state.selection;
    editor.commands.setContent(value, false, { preserveWhitespace: "full" });
    editor.commands.setTextSelection({ from, to });
  }, [editor, value, onChange]);

  if (!editor) return;

  return (
    <>
      <FixedMenu editor={editor} />
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
