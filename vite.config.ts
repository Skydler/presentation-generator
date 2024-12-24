import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    build: {
      sourcemap: command === "serve" ? true : false,
      commonjsOptions: { transformMixedEsModules: true }, // Change
    },
  };
});
