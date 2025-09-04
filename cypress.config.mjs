import { defineConfig } from "cypress";
import dotenvPlugin from "cypress-dotenv";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      return dotenvPlugin(config);
    },
  },
});
