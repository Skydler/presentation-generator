import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {
  target: "18",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // @ts-expect-error Idkman
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    commonjsOptions: { transformMixedEsModules: true }, // Change
  },
});
