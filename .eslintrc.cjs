module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'simple-import-sort', 'unused-imports'],
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva', 'clsx', 'twMerge', 'tw', 'classNames'],
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-console': 'error',
    'no-alert': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
