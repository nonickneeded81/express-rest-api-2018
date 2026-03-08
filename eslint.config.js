const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      parser: require('@babel/eslint-parser'),
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        Generator: true,
        $Keys: true,
        process: true,
        console: true,
        module: true,
        require: true,
        __dirname: true,
        exports: true,
        setTimeout: true,
        describe: true,
        it: true,
        before: true,
        beforeEach: true,
        after: true,
        afterEach: true,
      },
    },
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
