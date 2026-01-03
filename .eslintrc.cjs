module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2024: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  noInlineConfig: true,
  rules: {
    'lines-between-class-members': 'off',
    'no-param-reassign': ['off'],
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    'import/prefer-default-export': 'off',
  },
};
