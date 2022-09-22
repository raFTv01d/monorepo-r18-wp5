module.exports = {
  semi: true,
  trailingComma: "es5",
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,

  bracketSameLine: false,

  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "auto",
  useTabs: false,
  overrides: [
    {
      files: "*.md",
      options: {
        printWidth: 70,
        proseWrap: "never",
        useTabs: false,
        semi: false,
        trailingComma: "none",
      },
    },
  ],
};
