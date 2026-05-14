import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Standard Vite React SPA configuration for static hosting (Netlify / Vercel).
// The TanStack Start / Cloudflare SSR config is intentionally disabled here
// so that `npm run build` produces a normal dist/index.html + dist/assets/* output.
// Backend lives in /server and is deployed independently.
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    // Single flat output — no dist/client or dist/server split
    rollupOptions: {
      input: "index.html",
    },
  },
});
