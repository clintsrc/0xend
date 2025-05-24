import { defineConfig } from "cypress";
import clientViteConfig from "./client/vite.config";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // use the client component's vite config
      viteConfig: clientViteConfig,
    },
    // component scripts location
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // e2e scripts location
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    // use the running vite front-end dev server (dev mode only)
    baseUrl: "http://localhost:3000",
  },
});
