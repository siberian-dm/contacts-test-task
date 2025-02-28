module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@feature-sliced',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], ['internal'], ['sibling', 'parent', 'index']],
        pathGroups: [
          {
            pattern: '~/pages/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '~/widgets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/features/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/entities/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/shared/**',
            group: 'internal',
            position: 'after',
          },
        ],
        distinctGroup: false,
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['import', 'cjs-import'], next: '*' },
      { blankLine: 'any', prev: ['import', 'cjs-import'], next: ['import', 'cjs-import'] },
    ],
    'prettier/prettier': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'off',
    'no-empty': 'warn',
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    'import/no-internal-modules': 'off',
  },
};
