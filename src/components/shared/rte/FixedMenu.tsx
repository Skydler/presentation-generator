import { Group, Heading, HStack, IconButton, Separator } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import {
  LuAlertTriangle,
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuHeading,
  LuHeading1,
  LuHeading2,
  LuHeading3,
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
import { Tooltip } from "../../ui/tooltip";

type FixedMenuProps = { editor: Editor };
export function FixedMenu({ editor }: FixedMenuProps) {
  return (
    <HStack width="full" borderBottom="1px solid #e4e4e7">
      <HeadingSection editor={editor} />
      <MarksSection editor={editor} />
      <Separator orientation="vertical" height="20px" />
      <TextAlignSection editor={editor} />
      <MediaSection editor={editor} />
      <Separator orientation="vertical" height="20px" />
      <HistorySection editor={editor} />
    </HStack>
  );
}

function MarksSection({ editor }: { editor: Editor }) {
  return (
    <>
      <Tooltip content="Bold (Ctrl+B)">
        <IconButton
          variant={editor.isActive("bold") ? "solid" : "ghost"}
          size="xs"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <LuBold />
        </IconButton>
      </Tooltip>
      <Tooltip content="Italic (Ctrl+I)">
        <IconButton
          variant={editor.isActive("italic") ? "solid" : "ghost"}
          size="xs"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <LuItalic />
        </IconButton>
      </Tooltip>
      <Tooltip content="Underline (Ctrl+U)">
        <IconButton
          variant={editor.isActive("underline") ? "solid" : "ghost"}
          size="xs"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <LuUnderline />
        </IconButton>
      </Tooltip>
      <Tooltip content="Strikethrough (Ctrl+shift+S)">
        <IconButton
          variant={editor.isActive("strike") ? "solid" : "ghost"}
          size="xs"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <LuStrikethrough />
        </IconButton>
      </Tooltip>
    </>
  );
}

function TextAlignSection({ editor }: { editor: Editor }) {
  return (
    <>
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

      <Tooltip content="Bullet list (Ctrl + shift + 8)">
        <IconButton
          variant={editor.isActive("bulletList") ? "solid" : "ghost"}
          size="xs"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <LuList />
        </IconButton>
      </Tooltip>
      <Tooltip content="Ordered list (Ctrl + shift + 7)">
        <IconButton
          variant={editor.isActive("orderedList") ? "solid" : "ghost"}
          size="xs"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <LuListOrdered />
        </IconButton>
      </Tooltip>
    </>
  );
}

function MediaSection({ editor }: { editor: Editor }) {
  return (
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
      <FileUploadTrigger>
        <Tooltip content="Insert image">
          <IconButton variant="ghost" size="xs">
            <LuImage />
          </IconButton>
        </Tooltip>
      </FileUploadTrigger>
    </FileUploadRoot>
  );
}

function HistorySection({ editor }: { editor: Editor }) {
  return (
    <>
      <Tooltip content="Undo (Ctrl + Z)">
        <IconButton variant="ghost" size="xs" onClick={() => editor.chain().focus().undo().run()}>
          <LuUndo />
        </IconButton>
      </Tooltip>

      <Tooltip content="Redo (Ctrl + shift + Z)">
        <IconButton variant="ghost" size="xs" onClick={() => editor.chain().focus().redo().run()}>
          <LuRedo />
        </IconButton>
      </Tooltip>
    </>
  );
}

function HeadingSection({ editor }: { editor: Editor }) {
  return (
    <>
      <IconButton
        variant={editor.isActive("textStyle", { fontSize: 40 }) ? "solid" : "ghost"}
        size="xs"
        onClick={() => editor.chain().focus().setFontSize(40).run()}
      >
        <LuAlertTriangle />
      </IconButton>
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuHeading />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="h1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <LuHeading1 />
            <Heading size="3xl" fontWeight="bold">
              Title
            </Heading>
          </MenuItem>
          <MenuItem value="h2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <LuHeading2 />

            <Heading size="2xl" fontWeight="bold">
              Subtitle
            </Heading>
          </MenuItem>
          <MenuItem value="h3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <LuHeading3 />
            <Heading size="xl" fontWeight="bold">
              Heading
            </Heading>
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </>
  );
}
