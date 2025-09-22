import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  globalIgnores(["dist", "dev-dist"]),
  {
    files: ["**/*.{ts,tsx}", "**/*.{mjs,js}"],
    plugins: {
      import: importPlugin,
      "jsx-a11y": jsxA11y,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...jsxA11y.configs.strict.rules,
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling"],
          ],
          pathGroups: [{
            pattern: "react",
            group: "external",
            position: "before"
          }],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      "indent": ["error", 2],
      "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "jsx-quotes": ["error", "prefer-double"]
    }
  },
]);
