import { ChonkyIconName, defineFileAction } from "@aperturerobotics/chonky";

export const CreateFile = defineFileAction({
  id: "create_file",
  button: {
    name: "Create file",
    icon: ChonkyIconName.file,
    toolbar: true,
    tooltip: "Create a new file",
    contextMenu: true,
  },
} as const);
