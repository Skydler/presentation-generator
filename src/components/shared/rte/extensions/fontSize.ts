import "@tiptap/extension-text-style";

import { Extension } from "@tiptap/core";

type FontSizeOptions = {
  /**
   * The types where the fontSize can be applied
   * @default ['textStyle']
   * @example ['heading', 'paragraph']
   */
  types: string[];
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the text fontSize
       * @param fontSize The fontSize to set
       * @example editor.commands.setFontSize(14)
       */
      setFontSize: (fontSize: number) => ReturnType;

      /**
       * Unset the text fontSize
       * @example editor.commands.unsetFontSize()
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

/**
 * This extension allows you set the fontSize of your text.
 */
export const FontSize = Extension.create<FontSizeOptions>({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => {
              return element.style.fontSize.replace("px", "");
            },
            renderHTML: (attributes) => {
              if (!attributes["fontSize"]) {
                return {};
              }
              return {
                style: `font-size: ${attributes["fontSize"]}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
        },
    };
  },
});
