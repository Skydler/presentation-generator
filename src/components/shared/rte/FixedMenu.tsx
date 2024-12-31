import { Group, HStack, IconButton, Separator } from "@chakra-ui/react";
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
  LuRedo,
  LuStrikethrough,
  LuUnderline,
  LuUndo,
} from "react-icons/lu";
import { FileUploadRoot, FileUploadTrigger } from "../../ui/file-button";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../../ui/menu";

type FixedMenuProps = { editor: Editor };
export function FixedMenu({ editor }: FixedMenuProps) {
  return (
    <HStack width="full" borderBottom="1px solid #e4e4e7">
      <IconButton
        variant={editor.isActive("bold") ? "solid" : "ghost"}
        size="xs"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <LuBold />
      </IconButton>
      <IconButton
        variant={editor.isActive("italic") ? "solid" : "ghost"}
        size="xs"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <LuItalic />
      </IconButton>
      <IconButton
        variant={editor.isActive("underline") ? "solid" : "ghost"}
        size="xs"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <LuUnderline />
      </IconButton>
      <IconButton
        variant={editor.isActive("strike") ? "solid" : "ghost"}
        size="xs"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <LuStrikethrough />
      </IconButton>

      <Separator orientation="vertical" height="20px" />

      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton variant="ghost" size="xs">
            {editor.isActive({ textAlign: "left" }) ? (
              <LuAlignLeft />
            ) : editor.isActive({ textAlign: "center" }) ? (
              <LuAlignCenter />
            ) : editor.isActive({ textAlign: "right" }) ? (
              <LuAlignRight />
            ) : (
              <LuAlignLeft />
            )}
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <Group grow gap={0}>
            <MenuItem value="left">
              <IconButton
                variant={editor.isActive({ textAlign: "left" }) ? "solid" : "ghost"}
                size="xs"
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
              >
                <LuAlignLeft />
              </IconButton>
            </MenuItem>
            <MenuItem value="center">
              <IconButton
                variant={editor.isActive({ textAlign: "center" }) ? "solid" : "ghost"}
                size="xs"
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
              >
                <LuAlignCenter />
              </IconButton>
            </MenuItem>
            <MenuItem value="right">
              <IconButton
                variant={editor.isActive({ textAlign: "right" }) ? "solid" : "ghost"}
                size="xs"
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
              >
                <LuAlignRight />
              </IconButton>
            </MenuItem>
          </Group>
        </MenuContent>
      </MenuRoot>

      <IconButton
        variant={editor.isActive("bulletList") ? "solid" : "ghost"}
        size="xs"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <LuList />
      </IconButton>
      <IconButton
        variant={editor.isActive("orderedList") ? "solid" : "ghost"}
        size="xs"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <LuListOrdered />
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
        width="unset"
      >
        <FileUploadTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuImage />
          </IconButton>
        </FileUploadTrigger>
      </FileUploadRoot>

      <Separator orientation="vertical" height="20px" />

      <IconButton variant="ghost" size="xs" onClick={() => editor.chain().focus().undo().run()}>
        <LuUndo />
      </IconButton>

      <IconButton variant="ghost" size="xs" onClick={() => editor.chain().focus().redo().run()}>
        <LuRedo />
      </IconButton>
    </HStack>
  );
}
