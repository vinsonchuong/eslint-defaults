import path from 'path';
import {CLIEngine, linter} from 'eslint';
import PackageJson from '../lib/package_json';

const project = PackageJson.load();
const baseConfig = linter.defaults();

const options = {
  ignorePath: path.resolve('.gitignore'),
  baseConfig: Object.assign({}, baseConfig, {
    parser: 'babel-eslint',
    plugins: [
      'babel'
    ],
    ecmaFeatures: Object.assign({}, baseConfig.ecmaFeatures, {
      // modules: true,
      regexYFlag: true,
      regexUFlag: true
    }),
    env: {
      es6: true,
      browser: true,
      worker: true,
      serviceworker: true,
      node: true,
      jasmine: project.dependsOn(/jasmine/)
    },
    rules: Object.assign({}, baseConfig.rules, {
      // quotes: [2, 'single', 'avoid-escape'],
      // 'no-process-exit': 0,

      // 'generator-star-spacing': 0,
      // 'new-cap': 0,
      // 'object-shorthand': 0,

      'babel/new-cap': 2,
      'babel/generator-star-spacing': [2, {before: false, after: true}],
      'babel/object-shorthand': 2,

      'comma-dangle': 2,
      'no-cond-assign': 2,
      'no-console': 2,
      'no-constant-condition': 2,
      'no-control-regex': 2,
      'no-debugger': 2,
      'no-dupe-args': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-empty-character-class': 2,
      'no-empty': 2,
      'no-ex-assign': 2,
      'no-extra-boolean-cast': 2,
/*0*/ 'no-extra-parens': 2,
      'no-extra-semi': 2,
      'no-func-assign': 2,
//    'no-inner-declarations': [2, 'functions'],
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': 2,
      'no-negated-in-lhs': 2,
      'no-obj-calls': 2,
      'no-regex-spaces': 2,
      'no-sparse-arrays': 2,
      'no-unreachable': 2,
      'use-isnan': 2,
/*0*/ 'valid-jsdoc': 2,
      'valid-typeof': 2,
/*0*/ 'no-unexpected-multiline': 2,

/*0*/ 'accessor-pairs': 2,
/*0*/ 'block-scoped-var': 2,
      'complexity': [0, 11],
/*0*/ 'consistent-return': 2,
/*0*/ 'curly': 2,
/*0*/ 'default-case': 2,
/*0*/ 'dot-notation': 2,
/*0*/ 'dot-location': [2, 'property'],
/*0*/ 'eqeqeq': 2,
/*0*/ 'guard-for-in': 2,
/*0*/ 'no-alert': 2,
/*0*/ 'no-caller': 2,
      'no-div-regex': 0,
/*0*/ 'no-else-return': 2,
/*0*/ 'no-empty-label': 2,
/*0*/ 'no-eq-null': 2,
/*0*/ 'no-eval': 2,
/*0*/ 'no-extend-native': 2,
/*0*/ 'no-extra-bind': 2,
      'no-fallthrough': 2,
/*0*/ 'no-floating-decimal': 2,
/*0*/ 'no-implicit-coercion': 2,
/*0*/ 'no-implied-eval': 2,
/*0*/ 'no-invalid-this': 2,
/*0*/ 'no-iterator': 2,
/*0*/ 'no-labels': 2,
/*0*/ 'no-lone-blocks': 2,
/*0*/ 'no-loop-func': 2,
/*0*/ 'no-multi-spaces': [2, {exceptions: {Property: false}}],
/*0*/ 'no-multi-str': 2,
/*0*/ 'no-native-reassign': 2,
/*0*/ 'no-new-func': 2,
/*0*/ 'no-new-wrappers': 2,
/*0*/ 'no-new': 2,
/*0*/ 'no-octal-escape': 2,
      'no-octal': 2,
/*0*/ 'no-param-reassign': [2, {props: true}],
/*0*/ 'no-process-env': 2,
/*0*/ 'no-proto': 2,
      'no-redeclare': [2, {builtinGlobals: true}],
/*0*/ 'no-return-assign': 2,
/*0*/ 'no-script-url': 2,
/*0*/ 'no-self-compare': 2,
/*0*/ 'no-sequences': 2,
/*0*/ 'no-throw-literal': 2,
/*0*/ 'no-unused-expressions': 2,
/*0*/ 'no-useless-call': 2,
/*0*/ 'no-void': 2,
/*0*/ 'no-warning-comments': 2,
/*0*/ 'no-with': 2,
/*0*/ 'radix': 2,
/*0*/ 'vars-on-top': 2,
/*0*/ 'wrap-iife': 2,
/*0*/ 'yoda': 2,

/*0*/ 'strict': [2, 'never'],

/*0*/ 'init-declarations': 2,
/*0*/ 'no-catch-shadow': 2,
      'no-delete-var': 2,
/*0*/ 'no-label-var': 2,
/*0*/ 'no-shadow-restricted-names': 2,
/*0*/ 'no-shadow': 2,
/*0*/ 'no-undef-init': 2,
      'no-undef': 2,
/*0*/ 'no-undefined': 2,
      'no-unused-vars': 2,
/*0*/ 'no-use-before-define': 2,



      'no-array-constructor': 0,
      'no-bitwise': 0,
      'no-class-assign': 0,
      'no-const-assign': 0,
      'no-continue': 0,
      'no-inline-comments': 0,
      'no-lonely-if': 0,
      'no-mixed-requires': [0, false],
      'no-mixed-spaces-and-tabs': [2, false],
      'linebreak-style': [0, 'unix'],
      'no-multiple-empty-lines': [0, {'max': 2}],
      'no-nested-ternary': 0,
      'no-new-object': 0,
      'no-new-require': 0,
      'no-path-concat': 0,
      'no-plusplus': 0,
      'no-process-exit': 0,
      'no-restricted-modules': 0,
      'no-spaced-func': 0,
      'no-sync': 0,
      'no-ternary': 0,
      'no-trailing-spaces': 0,
      'no-this-before-super': 0,
      'no-underscore-dangle': 0,
      'no-unneeded-ternary': 0,
      'no-var': 0,

      'array-bracket-spacing': [0, 'never'],
      'arrow-parens': 0,
      'arrow-spacing': 0,
      'brace-style': [0, '1tbs'],
      'callback-return': 0,
      'camelcase': 0,
      'comma-spacing': 0,
      'comma-style': 0,
      'computed-property-spacing': [0, 'never'],
      'consistent-this': [0, 'that'],
      'constructor-super': 0,
      'eol-last': 0,
      'func-names': 0,
      'func-style': [0, 'declaration'],
      'generator-star-spacing': 0,
      'handle-callback-err': 0,
      'id-length': 0,
      'indent': 0,
      'key-spacing': [0, { 'beforeColon': false, 'afterColon': true }],
      'lines-around-comment': 0,
      'max-depth': [0, 4],
      'max-len': [0, 80, 4],
      'max-nested-callbacks': [0, 2],
      'max-params': [0, 3],
      'max-statements': [0, 10],
      'new-cap': 0,
      'new-parens': 0,
      'newline-after-var': 0,
      'object-curly-spacing': [0, 'never'],
      'object-shorthand': 0,
      'one-var': 0,
      'operator-assignment': [0, 'always'],
      'operator-linebreak': 0,
      'padded-blocks': 0,
      'prefer-const': 0,
      'prefer-spread': 0,
      'prefer-reflect': 0,
      'quote-props': 0,
      'quotes': [0, 'double'],
      'id-match': 0,
      'require-yield': 0,
      'semi': 0,
      'semi-spacing': [0, {'before': false, 'after': true}],
      'sort-vars': 0,
      'space-after-keywords': [0, 'always'],
      'space-before-blocks': [0, 'always'],
      'space-before-function-paren': [0, 'always'],
      'space-in-parens': [0, 'never'],
      'space-infix-ops': 0,
      'space-return-throw-case': 0,
      'space-unary-ops': [0, { 'words': true, 'nonwords': false }],
      'spaced-comment': 0,
      'wrap-regex': 0
    })
  })
};

const cli = new CLIEngine(options);
const formatter = cli.getFormatter();
const report = cli.executeOnFiles(['.']);

if (report.errorCount > 0) {
  process.stderr.write(formatter(report.results));
  process.exit(1);
}
