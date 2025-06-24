module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Integrates Prettier with ESLint
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    project: "./tsconfig.json", // Required for some TypeScript-specific rules
  },
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    // Add or override specific ESLint rules here
  },
};
