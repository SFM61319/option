/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  $schema: "https://json.schemastore.org/prettierrc",
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQuote: false,
  overrides: [],
  plugins: [],
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "consistent",
  requirePragma: false,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  vueIndentScriptAndStyle: false,
};

export default config;
