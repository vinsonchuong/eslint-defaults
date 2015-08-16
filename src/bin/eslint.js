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
      // 'babel/new-cap': 2,
      // 'babel/generator-star-spacing': [2, {before: false, after: true}],
      // 'babel/object-shorthand': 2,

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
      'no-extra-parens': 2,
      'no-extra-semi': 2,
      'no-func-assign': 2,
      'no-inner-declarations': 2,
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': 2,
      'no-negated-in-lhs': 2,
      'no-obj-calls': 2,
      'no-regex-spaces': 2,
      'no-sparse-arrays': 2,
      'no-unreachable': 2,
      'use-isnan': 2,
      'valid-jsdoc': 2,
      'valid-typeof': 2,
      'no-unexpected-multiline': 2,

      'accessor-pairs': 2,
      'block-scoped-var': 2,
      'complexity': [0, 11],
      'consistent-return': 2,
      'curly': 2,
      'default-case': 2,
      'dot-notation': 2,
      'dot-location': [2, 'property'],
      'eqeqeq': 2,
      'guard-for-in': 2,
      'no-alert': 2,
      'no-caller': 2,
      'no-div-regex': 0,
      'no-else-return': 2,
      'no-empty-label': 2,
      'no-eq-null': 2,
      'no-eval': 2,
      'no-extend-native': 2,
      'no-extra-bind': 2,
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-implicit-coercion': 2,
      'no-implied-eval': 2,
      'no-invalid-this': 2,
      'no-iterator': 2,
      'no-labels': 2,
      'no-lone-blocks': 2,
      'no-loop-func': 2,
      'no-multi-spaces': [2, {exceptions: {Property: false}}],
      'no-multi-str': 2,
      'no-native-reassign': 2,
      'no-new-func': 2,
      'no-new-wrappers': 2,
      'no-new': 2,
      'no-octal-escape': 2,
      'no-octal': 2,
      'no-param-reassign': [2, {props: true}],
      'no-process-env': 2,
      'no-proto': 2,
      'no-redeclare': [2, {builtinGlobals: true}],
      'no-return-assign': 2,
      'no-script-url': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-throw-literal': 2,
      'no-unused-expressions': 2,
      'no-useless-call': 2,
      'no-void': 2,
      'no-warning-comments': 2,
      'no-with': 2,
      'radix': 2,
      'vars-on-top': 2,
      'wrap-iife': 2,
      'yoda': 2,

      'strict': [2, 'never'],

      'init-declarations': 2,
      'no-catch-shadow': 0,
      'no-delete-var': 2,
      'no-label-var': 2,
      'no-shadow-restricted-names': 2,
      'no-shadow': 2,
      'no-undef-init': 2,
      'no-undef': 2,
      'no-undefined': 2,
      'no-unused-vars': 2,
      'no-use-before-define': 2,

      'callback-return': 2,
      'handle-callback-err': [2, '^(?:err|error)'],
      'no-mixed-requires': 2,
      'no-new-require': 2,
      'no-path-concat': 2,
      'no-process-exit': 2,
      'no-restricted-modules': 0,
      'no-sync': 2,

      'array-bracket-spacing': 2,
      'brace-style': 2,
      'camelcase': 2,
      'comma-spacing': 2,
      'comma-style': 2,
      'computed-property-spacing': 2,
      'consistent-this': [2, 'self'],
      'eol-last': 2,
      'func-names': 2,
      'func-style': [2, 'declaration'],
      'id-length': 2,
      'id-match': 0,
      'indent': [2, 2],
      'key-spacing': 2,
      'lines-around-comment': [2, {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true
      }],
      'linebreak-style': 2,
      'max-nested-callbacks': [2, 2],
      'new-cap': 2,
      'new-parens': 2,
      'newline-after-var': 2,
      'no-array-constructor': 2,
      'no-continue': 0,
      'no-inline-comments': 2,
      'no-lonely-if': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-multiple-empty-lines': [0, {max: 2}],
      'no-nested-ternary': 2,
      'no-new-object': 2,
      'no-spaced-func': 2,
      'no-ternary': 0,
      'no-trailing-spaces': 2,
      'no-underscore-dangle': 2,
      'no-unneeded-ternary': 2,
      'object-curly-spacing': 2,
      'one-var': 0,
      'operator-assignment': [2, 'always'],
      'operator-linebreak': 2,
      'padded-blocks': [2, 'never'],
      'quote-props': [2, 'consistent-as-needed'],
      'quotes': [2, 'single', 'avoid-escape'],
      'semi-spacing': 2,
      'semi': [2, 'always'],
      'sort-vars': 0,
      'space-after-keywords': 2,
      'space-before-blocks': 2,
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': 2,
      'space-infix-ops': [2, {int32Hint: true}],
      'space-return-throw-case': 2,
      'space-unary-ops': 2,
      'spaced-comment': 2,
      'wrap-regex': 0,

      'arrow-parens': [2, 'as-needed'],
      'arrow-spacing': 2,
      'constructor-super': 2,
      'generator-star-spacing': [2, 'after'],
      'no-class-assign': 2,
      'no-const-assign': 2,
      'no-this-before-super': 2,
      'no-var': 2,
      'object-shorthand': 2,
      'prefer-const': 2,
      'prefer-spread': 2,
      'prefer-reflect': 2,
      'require-yield': 2,
    })
  })
};

const cli = new CLIEngine(options);
const formatter = cli.getFormatter();
const report = cli.executeOnFiles(['.']);

if (report.errorCount > 0) {
  process.stderr.write(formatter(report.results));
  process.exit(1); // eslint-disable-line no-process-exit
}
