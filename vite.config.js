import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/PawMatch/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        dogQuiz: resolve(__dirname, "dog/dog-quiz.html"),
        dogResults: resolve(__dirname, "dog/dog-results.html"),
        dogBreedDetail: resolve(__dirname, "dog/dog-breed-detail.html"),
        catQuiz: resolve(__dirname, "cat/cat-quiz.html"),
        catResults: resolve(__dirname, "cat/cat-results.html"),
        catBreedDetail: resolve(__dirname, "cat/cat-breed-detail.html")
      }
    }
  }
});