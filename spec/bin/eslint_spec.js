import * as path from 'path';
import {childProcess} from 'node-promise-es6';
import Directory from 'directory-helpers';

const eslintBin = path.resolve('node_modules/eslint/bin/eslint.js');
const eslintDefaultsBin = path.resolve('node_modules/.bin/eslint');

class Project extends Directory {
  async exec(command) {
    const {stdout, stderr} = await childProcess.exec(`${command} || true`, {
      cwd: this.path()
    });
    return stdout.trim() || stderr.trim();
  }

  async eslint(args) {
    return await this.exec(`${eslintBin} -c _eslintrc ${args}`);
  }

  async eslintDefaults(args) {
    return await this.exec(`${eslintDefaultsBin} ${args}`);
  }

  async expectSameOutput(eslintDefaultArgs, eslintArgs) {
    const actual = await this.eslintDefaults(eslintDefaultArgs);
    const expected = await this.eslint(eslintArgs || eslintDefaultArgs);
    expect(actual).toBe(expected);
  }
}

describe('eslint', () => {
  afterEach(async () => {
    await new Project('project').remove();
  });

  it('preserves CLI flags', async () => {
    const project = new Project('project');
    await project.create();
    await project.expectSameOutput('-h');
  });

  it('can lint ES5', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        rules: {
          'no-debugger': 2
        }
      },
      'index.js': `
        debugger;
      `
    });
    await project.expectSameOutput('index.js');
  });

  it('can lint ES.next', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        parser: 'babel-eslint'
      },
      'index.js': `
        import * as path from 'path';
        path.resolve();
      `
    });
    await project.expectSameOutput('index.js');
  });

  it('can lint async functions with generator-star-spacing', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        parser: 'babel-eslint',
        plugins: ['babel'],
        rules: {
          'babel/generator-star-spacing': [2, 'after']
        }
      },
      'index.js': `
        async function run() {
          await Promise.resolve(42);
        }
        run();
      `
    });
    await project.expectSameOutput('index.js');
  });

  it('can lint export statements with object-curly-spacing', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        parser: 'babel-eslint',
        plugins: ['babel'],
        rules: {
          'babel/object-curly-spacing': 2
        }
      },
      'index.js': `
        export * from 'fs';
        export * as fse from 'fs';
      `
    });
    await project.expectSameOutput('index.js');
  });

  it('can lint object spread with object-shorthand', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        parser: 'babel-eslint',
        plugins: ['babel'],
        rules: {
          'babel/object-shorthand': 2
        }
      },
      'index.js': `
        const {one, two, ...rest} = {one: 1, two: 2, three: 3, four: 4};
        JSON.stringify({one, two, ...rest});
      `
    });
    await project.expectSameOutput('index.js');
  });

  it('defaults to linting the current directory', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        rules: {
          'no-debugger': 2
        }
      },
      'index.js': `
        debugger;
      `
    });
    await project.expectSameOutput('', 'index.js');
  });

  it('ignores files listed in .gitignore', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        rules: {
          'no-debugger': 2
        }
      },
      '.gitignore': `
        index.js
      `,
      'index.js': `
        debugger;
      `
    });
    await project.expectSameOutput('', '--ignore-path .gitignore .');
  });
});
