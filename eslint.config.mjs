import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: true,
      },
      globals: {
        Generator: true,
        $Keys: true,
        process: true,
        console: true,
        setTimeout: true,
        module: true,
        require: true,
        __dirname: true,
      },
    },
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        describe: true,
        it: true,
        before: true,
        after: true,
        beforeEach: true,
        afterEach: true,
      },
    },
  },
];
