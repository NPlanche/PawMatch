import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/PawMatch/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        quiz: resolve(__dirname, "quiz.html"),
        results: resolve(__dirname, "results.html"),
        breedDetail: resolve(__dirname, "breed-detail.html")
      }
    }
  }
});