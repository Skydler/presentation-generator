import { Group, Heading, HStack, IconButton, Separator } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import {
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
import { NumberInputField, NumberInputRoot } from "../../ui/number-input";

type FixedMenuProps = { editor: Editor };
export function FixedMenu({ editor }: FixedMenuProps) {
  return (
    // NOTE:
    // FileUploadRoot needs to be above the HStack to work properly for some reason. I couldn't find the root cause
    <FileUploadRoot
      accept={["image/png", "image/jpeg", "image/webp"]}
      onFileAccept={(details) => {
        // Should always be a single file
        const file = details.files[0];
        const url = URL.createObjectURL(file);
        editor.chain().focus().setImage({ src: url }).run();
      }}
      maxFileSize={5 * 1024 * 1024} // 5MB
    >
      <HStack width="full" borderBottom="1px solid #e4e4e7">
        <MarksSection editor={editor} />
        <FontStyleSection editor={editor} />
        <Separator orientation="vertical" height="20px" />
        <TextAlignSection editor={editor} />
        <MediaSection />
        <Separator orientation="vertical" height="20px" />
        <HistorySection editor={editor} />
      </HStack>
    </FileUploadRoot>
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

function MediaSection() {
  return (
    <FileUploadTrigger asChild>
      <IconButton variant="ghost" size="xs">
        <LuImage />
      </IconButton>
    </FileUploadTrigger>
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

function FontStyleSection({ editor }: { editor: Editor }) {
  return (
    <>
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
      <NumberInputRoot
        size="sm"
        width="60px"
        defaultValue="16"
        min={1}
        max={100}
        allowMouseWheel
        allowOverflow={false}
        onValueChange={(details) => editor.chain().setFontSize(details.valueAsNumber).run()}
      >
        <NumberInputField />
      </NumberInputRoot>
    </>
  );
}
