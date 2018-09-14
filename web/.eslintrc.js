module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    L: false,
    okIcon: false,
    errorIcon: false,
    huiIcon: false,
    mapW: false,
    mapH: false
  }
};
