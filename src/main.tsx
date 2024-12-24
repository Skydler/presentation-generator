import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider enableSystem={false}>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>,
);
