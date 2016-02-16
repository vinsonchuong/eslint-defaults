import * as path from 'path';
import {fs, childProcess} from 'node-promise-es6';
import * as fse from 'fs-extra-promise-es6';

const eslintBin = path.resolve('node_modules/eslint/bin/eslint.js');
const eslintDefaultsBin = path.resolve('node_modules/.bin/eslint');

class Project {
  constructor() {
    /* eslint-disable lines-around-comment, no-sync */
    fs.mkdirSync(this.path());
    /* eslint-enable lines-around-comment, no-sync */
  }

  path(...args) {
    return path.resolve('project', ...args);
  }

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

  async write(file, data) {
    if (typeof data === 'object') {
      await fse.writeJson(this.path(file), data);
    } else {
      const lines = data.split('\n');
      const indent = lines[1].match(/^\s*/)[0].length;
      const indentedCode = lines
        .map((line) => line.slice(indent))
        .join('\n')
        .trim();
      await fs.writeFile(this.path(file), `${indentedCode}\n`);
    }
  }
}

describe('eslint', () => {
  afterEach(async () => {
    await fse.remove('project');
  });

  it('preserves CLI flags', async () => {
    const project = new Project();
    await project.expectSameOutput('-h');
  });

  it('can lint ES5', async () => {
    const project = new Project();
    await project.write('_eslintrc', {
      rules: {
        'no-debugger': 2
      }
    });
    await project.write('index.js', `
      debugger;
    `);
    await project.expectSameOutput('index.js');
  });

  it('can lint ES.next', async () => {
    const project = new Project();
    await project.write('_eslintrc', {
      parser: 'babel-eslint'
    });
    await project.write('index.js', `
      import * as path from 'path';
      path.resolve();
    `);
    await project.expectSameOutput('index.js');
  });

  it('can lint async functions with generator-star-spacing', async () => {
    const project = new Project();
    await project.write('_eslintrc', {
      parser: 'babel-eslint',
      rules: {
        'generator-star-spacing': [2, 'after']
      }
    });
    await project.write('index.js', `
      async function run() {
        await Promise.resolve(42);
      }
      run();
    `);
    await project.expectSameOutput('index.js');
  });

  it('can lint export statements with object-curly-spacing', async () => {
    const project = new Project();
    await project.write('_eslintrc', {
      parser: 'babel-eslint',
      rules: {
        'object-curly-spacing': 2
      }
    });
    await project.write('index.js', `
      export * from 'fs';
    `);
    await project.expectSameOutput('index.js');
  });

  it('can lint object spread with object-shorthand', async () => {
    const project = new Project();
    await project.write('_eslintrc', {
      parser: 'babel-eslint',
      rules: {
        'object-shorthand': 2
      }
    });
    await project.write('index.js', `
      const {one, two, ...rest} = {one: 1, two: 2, three: 3, four: 4};
      JSON.stringify({one, two, ...rest});
    `);
    await project.expectSameOutput('index.js');
  });

  it('defaults to linting the current directory', async () => {
    const project = new Project();
    await project.write('_eslintrc', {
      rules: {
        'no-debugger': 2
      }
    });
    await project.write('index.js', `
      debugger;
    `);
    await project.expectSameOutput('', 'index.js');
  });

  it('ignores files listed in .gitignore', async () => {
    const project = new Project();
    await project.write('_eslintrc', {
      rules: {
        'no-debugger': 2
      }
    });
    await project.write('.gitignore', `
      index.js
    `);
    await project.write('index.js', `
      debugger;
    `);
    await project.expectSameOutput('', '--ignore-path .gitignore .');
  });
});
