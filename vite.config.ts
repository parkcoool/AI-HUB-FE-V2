import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), basicSsl()],
  server: {
    host: true,
    allowedHosts: ["local.dev.aihub.io.kr"],
    proxy: {
      "/api": {
        target: "https://dev.aihub.io.kr",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
