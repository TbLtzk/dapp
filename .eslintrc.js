module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-case-declarations': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'prefer-destructuring': 'off',
    'react/display-name': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error']
      }
    ]
  }
}
