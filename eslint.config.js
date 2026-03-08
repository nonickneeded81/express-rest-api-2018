import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'object-curly-spacing': 'off',
      'object-curly-newline': 'off',
      'arrow-body-style': 'off',
      'no-underscore-dangle': 'off',
      'prefer-destructuring': ['warn', {
        array: false,
        object: true,
      }],
      'semi-style': 'off',
    },
  },
];
