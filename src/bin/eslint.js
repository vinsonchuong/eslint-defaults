import path from 'path';
import {CLIEngine, linter} from 'eslint';
import PackageJson from '../lib/package_json';

const project = PackageJson.load();
const baseConfig = linter.defaults();

const options = {
  baseConfig: Object.assign(baseConfig, {
    parser: 'babel-eslint',
    env: Object.assign(baseConfig.env, {
      es6: true,
      browser: true,
      node: true,
      jasmine: project.dependsOn(/jasmine/)
    }),
    ecmaFeatures: Object.assign(baseConfig.ecmaFeatures, {
      modules: true
    }),
    rules: Object.assign(baseConfig.rules, {
      strict: 0,
      quotes: [2, 'single'],
      'no-process-exit': 0
    })
  }),
  ignorePath: path.resolve('.gitignore')
};

const cli = new CLIEngine(options);
const formatter = cli.getFormatter();
const report = cli.executeOnFiles(['.']);

if (report.errorCount > 0) {
  throw formatter(report.results);
}
