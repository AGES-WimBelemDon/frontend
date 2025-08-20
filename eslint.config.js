import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['dist', 'dev-dist']),
  {
    files: ['**/*.{ts,tsx}', '**/*.{mjs,js}'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling'],
          ],
          pathGroups: [{
            pattern: 'react',
            group: 'external',
            position: 'before'
          }],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'indent': ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
    }
  },
]);
