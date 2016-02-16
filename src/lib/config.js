module.exports = {
  extends: 'eslint',
  parser: 'babel-eslint',
  plugins: ['babel'],
  env: {
    es6: true,

    browser: true,
    serviceworker: true,
    worker: true,
    node: true,
    phantomjs: true,
    greasemonkey: true,
    webextensions: true,

    mocha: true,
    jasmine: true,
    jest: true,
    protractor: true,
    qunit: true,
    embertest: true
  },
  rules: {
    'accessor-pairs': 2,
    'array-bracket-spacing': 2,
    'array-callback-return': 0,
    'arrow-body-style': 2,
    'babel/arrow-parens': 2,
    'arrow-spacing': 2,
    'block-scoped-var': 2,
    'computed-property-spacing': 2,
    'consistent-this': [2, 'self'],
    'dot-location': [2, 'property'],
    'func-names': 2,
    'generator-star-spacing': [2, 'after'],
    'global-require': 2,
    'handle-callback-err': [2, '^(?:err|error)'],
    'id-length': [2, {properties: 'never'}],
    'indent': [2, 2],
    'jsx-quotes': 2,
    'linebreak-style': 2,
    'lines-around-comment': [2, {beforeBlockComment: true, beforeLineComment: true, allowBlockStart: true}],
    'no-confusing-arrow': 2,
    'no-console': 2,
    'no-else-return': 2,
    'no-eq-null': 2,
    'no-extra-label': 2,
    'no-extra-parens': 2,
    'no-implicit-coercion': 2,
    'no-implicit-globals': 2,
    'no-inline-comments': 2,
    'no-lonely-if': 2,
    'no-multiple-empty-lines': [2, {max: 1}],
    'no-multi-spaces': [2, {exceptions: {Property: false}}],
    'no-negated-condition': 2,
    'no-param-reassign': 2,
    'no-plusplus': 2,
    'no-redeclare': [2, {builtinGlobals: true}],
    'no-self-compare': 2,
    'no-sync': 2,
    'no-throw-literal': 2,
    'no-unneeded-ternary': 2,

    // 'no-use-before-define': 2,
    'no-use-before-define': 0,

    'no-useless-call': 2,
    'no-useless-constructor': 2,
    'no-var': 2,
    'no-void': 2,
    'no-warning-comments': 2,
    'no-whitespace-before-property': 2,
    'object-curly-spacing': 2,
    'object-shorthand': 2,
    'one-var-declaration-per-line': 2,
    'operator-assignment': 2,
    'operator-linebreak': 2,
    'padded-blocks': [2, 'never'],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-reflect': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'prefer-template': 2,
    'quote-props': [2, 'consistent-as-needed'],
    'quotes': [2, 'single', 'avoid-escape'],
    'require-jsdoc': 0,
    'require-yield': 2,
    'space-infix-ops': [2, {int32Hint: true}],
    'space-in-parens': 2,
    'strict': [2, 'never'],
    'template-curly-spacing': 2,
    'vars-on-top': 2,
    'yield-star-spacing': 2
  }
};
