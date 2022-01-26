// @ts-check

/** @type {import("eslint").Linter.Config} */
// module.exports = {...} とすると型チェックが何故か働かないので，変数定義を挟む
const config = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    // @ts-expect-error type上では何故か12までしか許容されない(けど実行時は大丈夫っぽい？)
    "ecmaVersion": 13,
    "sourceType": "module"
  },
  // `npm run eslint` だと .eslintrc.js とかは含まれないけど，
  // emacs から eslint を実行すると含まれてしまうので，
  // ignorePatterns を使って除外しておく
  "ignorePatterns": [".eslintrc.js", "docusaurus.config.js"],
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "unused-imports"
  ],
  "settings": {
    "react": {
      "version": "detect" // for eslint-plugin-react
    }
  },
  "rules": {
    "indent": [
      "error",
      2,
      {"SwitchCase": 1},
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": "off", // typescript-eslint を使う
    "@typescript-eslint/explicit-function-return-type": [
      2,
      { "allowExpressions": true }
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": "off", // provided by "unused-imports"
    "@typescript-eslint/semi": ["error", "never"],
    "@typescript-eslint/member-delimiter-style": [
      // interface とかの中で semicolon とかを使うかどうか
      "error",
      {
        "multiline": {
          "delimiter": "none",
          "requireLast": true,
        },
        "singleline": {
          "delimiter": "comma",
          "requireLast": false,
        }
      }
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    "sort-imports": 0,
    "import/order": [2, { "alphabetize": { "order": "asc" } }],
    "import/named": 0, // Language not found in 'prism-react-renderer'
    "import/no-unresolved": 0, // ちゃんと設定できてないせいか大量に出てきてしまう
  }
}

module.exports = config
