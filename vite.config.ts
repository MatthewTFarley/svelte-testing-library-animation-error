import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting({
      // autoCleanup: true, // does not work because it runs Svelte 4 cleanup
      resolveBrowser: true,
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    environment: "jsdom",
    globals: true, // required to run correct autocleanup
  },
});
