module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-indent": ["warn", 2],
    "react/jsx-indent-props": ["warn", 2],
    "react/jsx-props-no-spreading": [0],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    indent: ["warn", 2],
    "linebreak-style": ["warn", "unix"],
    semi: ["warn", "always"],
    "no-unused-vars": [
      "warn",
      { vars: "all", args: "none", ignoreRestSiblings: false },
    ],
  },
};
