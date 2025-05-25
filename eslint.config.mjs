import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
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
      'no-template-curly-in-string': 'error'
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
  ...tseslint.configs.recommended,

  // React JSX/TSX-specific rules
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
    plugins: {
      react: pluginReact,
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
