// eslint.config.mjs
import globals from "globals";

export default [
  {
    files: ["**/*.ts"],  // only TypeScript files
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      // Regex-based enforcement: variable names starting with _ are allowed
      // This won't detect actual TS private modifier, but enforces _ for "private" style
      "id-match": [
        "error",
        "^_?[a-z][a-zA-Z0-9]*$",
        {
          properties: true,
          onlyDeclarations: false
        }
      ]
    }
  }
];
