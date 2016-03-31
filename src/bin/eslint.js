import * as fs from 'fs';
import cli from 'eslint/lib/cli';
import options from 'eslint/lib/options';

const cliOptions = options.parse(process.argv);
if (!cliOptions.config) {
  cliOptions.config = require.resolve('eslint-defaults/lib/config');
}
if (cliOptions._.length === 0) {
  cliOptions._ = ['src', 'spec'];
}
if (!cliOptions.ignorePath) {
  try {
    /* eslint-disable lines-around-comment, no-sync */
    fs.statSync('.gitignore');
    /* eslint-enable lines-around-comment, no-sync */
    cliOptions.ignorePath = '.gitignore';
  } catch (error) {
    // .gitignore does not exist
  }
}

/* eslint-disable lines-around-comment, no-process-exit */
process.exit(cli.execute(cliOptions));
/* eslint-enable lines-around-comment, no-process-exit */
