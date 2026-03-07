const js = require("@eslint/js");
const babelParser = require("@babel/eslint-parser");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: true,
      },
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        exports: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
        setTimeout: "readonly",
      },
    },
    rules: {
      "no-alert": "off",
      "no-console": "off",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
];
