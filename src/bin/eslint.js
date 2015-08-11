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
      // modules: true
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
      strict: 0,
      quotes: [2, 'single', 'avoid-escape'],
      'no-process-exit': 0,

      'generator-star-spacing': 0,
      'new-cap': 0,
      'object-shorthand': 0,

      'babel/new-cap': 2,
      'babel/generator-star-spacing': [2, {before: false, after: true}],
      'babel/object-shorthand': 2
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
