// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    'resolve': true,
  },
  // check if imports actually resolve
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: 'build/webpack.base.conf.js'
  //     }
  //   }
  // },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'eol-last': [0],
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],
    'no-continue': [0],
    'no-plusplus': [0],
    'eol-last': [0],
    'no-new': [0],
    'no-param-reassign': [0],
    'no-alert': [0],
    'no-underscore-dangle': [0],
    'brace-style': ["error", "stroustrup"],
    'space-before-function-paren': ['error', 'never'],
    'linebreak-style': [0],
    'no-shadow': [0],
    'consistent-return': [0],
    'import/extensions': [0],
    'space-before-function-paren': ['error', 'never'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
