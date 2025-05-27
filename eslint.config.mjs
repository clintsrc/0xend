import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // ignore the compiled files and packages
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'client/dist/**',
      'server/dist/**',
      'build/**',
      'coverage/**',
      '**/*.config.*',
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.d.ts',
      '**/*.min.*',
      '**/*.map',
      '**/*.json',
      '**/*.md',
    ],
  },
  {
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      // 'no-console': 'warn',
      'prefer-const': 'error',
      'no-template-curly-in-string': 'error',
    },
  },
  // Base JS setup with globals
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    ...js.configs.recommended,
  },

  // TypeScript rules
  // Choose one TypeScript config:
  // ...tseslint.configs.recommended  // Basic rules, no (or shallow) type-checking
  // ...tseslint.configs.recommendedTypeChecked // Moderate rules, requires type-checking
  // ...tseslint.configs.strictTypeChecked  // Strict, opinionated rules, requires full type-checking
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      ...(config.languageOptions ?? {}),
      parserOptions: {
        ...(config.languageOptions?.parserOptions ?? {}),
        project: './tsconfig.json',
      },
    },
  })),
  // React JSX/TSX-specific rules
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended, // includes jsx-runtime internally for React 17+
    ...pluginReactHooks.configs.recommended,
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prefer-const': 'error',
    },
  },

  // Prettier formatting
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error'],
    },
  },
  // Disable conflicting ESLint rules
  configPrettier,
]);
