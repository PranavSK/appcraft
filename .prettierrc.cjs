/** @type {import('prettier').Config} */
module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 100,
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindAttributes: ['myCustomClassNameAttribute'],
  tailwindFunctions: ['cn', 'cva', 'clsx', 'twMerge', 'tw', 'classNames'],
};
