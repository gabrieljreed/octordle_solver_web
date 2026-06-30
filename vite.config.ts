import { defineConfig } from "vite";

export default defineConfig({
  base: "/octordle_solver_web/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  worker: {
    format: "es",
  },
  test: {
    environment: "node",
  },
});
