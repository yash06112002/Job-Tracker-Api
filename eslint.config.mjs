import eslintPluginJest from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        describe: 'readonly',
        it: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    plugins: {
      jest: eslintPluginJest,
    },
    // Directly include recommended Jest configuration:
    rules: {
      ...eslintPluginJest.configs.recommended.rules,
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },
];
