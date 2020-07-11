// @ts-check
// Command line: node node_modules/eslint/bin/eslint.js --ext .js,.ts,.tsx .
// The Visual Studio Code ESLint plugin will show problems in the IDE as you work.

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: { // This allows rules that require type information to function, but takes additional time.
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    // ESLint rules: https://eslint.org/docs/rules/
    // TypeScript rules: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    // Sometimes the ESLint rule mishandles TypeScript structures and TypeScript rules must be used instead.
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/brace-style": "warn",
    "@typescript-eslint/comma-spacing": "warn",
    "@typescript-eslint/default-param-last": "warn",
    "@typescript-eslint/explicit-function-return-type": "off", // Makes TypeScript harder to use by not allowing it to infer return types.
    "@typescript-eslint/func-call-spacing": "warn",
    // "@typescript-eslint/indent": "warn", // Check https://github.com/typescript-eslint/typescript-eslint/issues/1824 before enabling.
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn", // Requires TypeScript 3.9+
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/no-base-to-string": "warn",
    "@typescript-eslint/no-dupe-class-members": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-extra-semi": "warn",
    "@typescript-eslint/no-extraneous-class": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-implied-eval": "warn",
    "@typescript-eslint/no-namespace": "warn",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/no-throw-literal": "warn",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/no-unused-vars": "off", // Covered by the TypeScript compiler configuration.
    "@typescript-eslint/no-useless-constructor": "warn",
    "@typescript-eslint/quotes": ["warn", "double"],
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/restrict-template-expressions": "warn",
    "@typescript-eslint/return-await": "warn",
    "@typescript-eslint/semi": "warn",
    "@typescript-eslint/space-before-function-paren": ["warn", {
      anonymous: "never",
      named: "never",
      asyncArrow: "always",
    }],
    "array-bracket-spacing": "warn",
    "array-callback-return": "warn",
    "arrow-spacing": "warn",
    "block-scoped-var": "warn",
    "block-spacing": "warn",
    "brace-style": "off", // Replaced by @typescript-eslint/brace-style.
    "class-methods-use-this": "warn",
    "comma-dangle": ["warn", "always-multiline"],
    "comma-spacing": "off", // Replaced by @typescript-eslint/comma-spacing.
    "default-param-last": "off", // Replaced by @typescript-eslint/default-param-last.
    "eol-last": "warn",
    eqeqeq: "warn",
    "func-call-spacing": "off", // Replaced by @typescript-eslint/func-call-spacing.
    indent: ["warn", 2], // Potentially replaced by @typescript-eslint/indent.
    "key-spacing": "warn",
    "keyword-spacing": "warn",
    "lines-between-class-members": "warn",
    "new-parens": "warn",
    "no-dupe-class-members": "off", // Replaced by "@typescript-eslint/no-dupe-class-members.
    "no-duplicate-imports": "warn",
    "no-else-return": "warn",
    "no-empty-pattern": "warn",
    "no-extra-semi": "off", // Replaced by @typescript-eslint/no-extra-semi.
    "no-lonely-if": "warn",
    "no-multi-spaces": "warn",
    "no-multiple-empty-lines": ["warn", { max: 1 }],
    "no-new-wrappers": "warn",
    "no-return-await": "off", // Replaced by @typescript-eslint/return-await.
    "no-trailing-spaces": "warn",
    "no-unneeded-ternary": "warn",
    "no-unused-expressions": "off", // Replaced by @typescript-eslint/no-unused-expressions.
    "no-useless-computed-key": "warn",
    "no-useless-constructor": "off", // Replaced by @typescript-eslint/no-useless-constructor.
    "no-whitespace-before-property": "warn",
    "nonblock-statement-body-position": "warn",
    "object-curly-newline": ["warn", {
      consistent: true,
      minProperties: 2,
    }],
    "object-curly-spacing": ["warn", "always"],
    "object-property-newline": ["warn", { allowAllPropertiesOnSameLine: false }],
    "object-shorthand": "warn",
    "padded-blocks": ["warn", "never"],
    "prefer-object-spread": "warn",
    "prefer-template": "warn",
    quotes: "off", // Replaced by @typescript-eslint/quotes.
    "quote-props": ["warn", "as-needed"],
    "require-await": "off", // Replaced by @typescript-eslint/require-await.
    "rest-spread-spacing": "warn",
    semi: "off", // Replaced by with @typescript-eslint/semi.
    "semi-spacing": "warn",
    "semi-style": "warn",
    "sort-imports": "warn",
    "space-before-blocks": "warn",
    "space-before-function-paren": "off", // Replaced by @typescript-eslint/space-before-function-paren.
    "space-in-parens": "warn",
    "space-infix-ops": "warn",
    "space-unary-ops": "warn",
    "spaced-comment": "warn",
    "switch-colon-spacing": "warn",
    "template-curly-spacing": "warn",
    "template-tag-spacing": "warn",
    yoda: "warn",
  },
};
