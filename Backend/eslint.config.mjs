// eslint.config.mjs
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      prettier,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "id-match": [
        "error",
        "^_?[a-z][a-zA-Z0-9]*$",
        {
          properties: true,
          onlyDeclarations: false,
        },
      ],
      "prettier/prettier": "error",
    },
  },
  configPrettier
];
