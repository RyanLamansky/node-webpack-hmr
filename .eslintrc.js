module.exports = {
  root: true,
  env: {
      node: true,
      commonjs: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "eqeqeq": "error",
    "no-return-await": "error",
    "prefer-object-spread": "error",
    "quotes": ["error", "double"],
    "quote-props": ["error", "as-needed"],
    "require-await": "error",
    "semi": "error",
  },
};
