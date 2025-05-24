import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // ignore the compiled files, packages and this lint file itself
    ignores: ["dist/**", "node_modules/**", "*.config.*"],
  },
  {
    rules: {
      quotes: ["error", "single"],
    },
  },
  // Base JS setup with globals
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    ...js.configs.recommended,
  },

  // TypeScript rules
  ...tseslint.configs.recommended,

  // React JSX/TSX-specific rules
  {
    files: ["**/*.{jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "prefer-const": "error",
    },
  },
]);
