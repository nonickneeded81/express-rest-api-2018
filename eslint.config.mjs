import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: true,
      },
      globals: {
        ...globals.node,
        ...globals.mocha,
        Generator: true,
        $Keys: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'object-curly-spacing': 'off',
      'object-curly-newline': 'off',
      'arrow-body-style': 'off',
      'no-underscore-dangle': 'off',
      'global-require': 'off',
      'semi-style': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
