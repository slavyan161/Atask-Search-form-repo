import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";


export default defineConfig({
  base: "/Atask-Search-form-repo/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  define: {
    'process.env': {
      VITE_GITHUB_API: JSON.stringify(process.env.VITE_GITHUB_API)
    }
  }
});
