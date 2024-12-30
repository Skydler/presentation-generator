import { HStack, IconButton } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuImage,
  LuItalic,
  LuList,
  LuListOrdered,
  LuMinus,
  LuRedo,
  LuStrikethrough,
  LuUnderline,
  LuUndo,
} from "react-icons/lu";
import { FileUploadRoot, FileUploadTrigger } from "../../ui/file-button";

type FixedMenuProps = { editor: Editor };
export function FixedMenu({ editor }: FixedMenuProps) {
  return (
    <HStack>
      <IconButton
        variant={editor.isActive("bold") ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <LuBold />
      </IconButton>
      <IconButton
        variant={editor.isActive("italic") ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <LuItalic />
      </IconButton>
      <IconButton
        variant={editor.isActive("underline") ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <LuUnderline />
      </IconButton>
      <IconButton
        variant={editor.isActive("strike") ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <LuStrikethrough />
      </IconButton>
      <IconButton
        // BUG: this button does not work
        variant={editor.isActive("bulletList") ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <LuList />
      </IconButton>
      <IconButton
        variant={editor.isActive("orderedList") ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <LuListOrdered />
      </IconButton>

      <IconButton
        variant={editor.isActive({ textAlign: "left" }) ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <LuAlignLeft />
      </IconButton>

      <IconButton
        variant={editor.isActive({ textAlign: "center" }) ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <LuAlignCenter />
      </IconButton>
      <IconButton
        variant={editor.isActive({ textAlign: "right" }) ? "solid" : "outline"}
        size="xs"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <LuAlignRight />
      </IconButton>

      <IconButton variant="outline" size="xs" onClick={() => editor.chain().focus().undo().run()}>
        <LuUndo />
      </IconButton>
      <IconButton variant="outline" size="xs" onClick={() => editor.chain().focus().redo().run()}>
        <LuRedo />
      </IconButton>
      <FileUploadRoot
        accept={"image/png, image/jpeg, image/webp"}
        onFileAccept={(details) => {
          // Should always be a single file
          const file = details.files[0];
          const url = URL.createObjectURL(file);
          editor.chain().focus().setImage({ src: url }).run();
        }}
        allowDrop={false}
      >
        <FileUploadTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuImage />
          </IconButton>
        </FileUploadTrigger>
      </FileUploadRoot>
      {/* TODO: Color and background color, links */}
    </HStack>
  );
}
