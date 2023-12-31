import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
import hotReloadExtension from "hot-reload-extension-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [{ src: ["./manifest.json"], dest: "./dist-firefox" }],
      hook: "writeBundle",
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: "none",
    }),
  ],
  build: {
    outDir: "dist-chrome",
  },
});
