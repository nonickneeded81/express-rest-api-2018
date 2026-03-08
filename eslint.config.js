const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const flowtype = require('eslint-plugin-flowtype');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'config/**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: true,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        Generator: 'readonly',
        $Keys: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
      flowtype: flowtype,
    },
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'no-underscore-dangle': 'off',
      'arrow-body-style': 'off',
      'semi-style': 'off',
    },
  },
];
