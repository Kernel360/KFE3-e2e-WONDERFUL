const config = {
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 80,
  proseWrap: "never",
  singleQuote: true,
  htmlWhitespaceSensitivity: "css",
  jsxSingleQuote: true,
  endOfLine: "lf",
  bracketSpacing: true,
  arrowParens: "always",
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
};

module.exports = config;
