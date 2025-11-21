import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared", "./data"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin(), dataFolderPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}

function dataFolderPlugin(): Plugin {
  return {
    name: "copy-data-folder",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      const sourceDir = path.resolve(__dirname, "data");
      const destDir = path.resolve(__dirname, "dist/spa/data");

      try {
        // Create destination directory
        mkdirSync(destDir, { recursive: true });

        // Copy all files from data folder
        const files = readdirSync(sourceDir);
        for (const file of files) {
          const sourceFile = path.join(sourceDir, file);
          const destFile = path.join(destDir, file);

          // Only copy files, not directories
          if (statSync(sourceFile).isFile()) {
            copyFileSync(sourceFile, destFile);
          }
        }

        console.log("✓ Data folder copied to dist/spa/data");
      } catch (error) {
        console.error("Failed to copy data folder:", error);
      }
    },
  };
}
