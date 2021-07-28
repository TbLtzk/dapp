module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    camelcase: 'off',
    'no-case-declarations': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'node/handle-callback-err': 'off',
    'no-mixed-operators': 'off',
    'multiline-ternary': 'off',
    'no-lone-blocks': 'off',
    'no-useless-escape': 'off',
    'no-prototype-builtins': 'off'
  }
}
