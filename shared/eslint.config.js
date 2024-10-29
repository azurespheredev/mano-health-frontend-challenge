import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.ts"],
  languageOptions: { globals: globals.browser },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
});
