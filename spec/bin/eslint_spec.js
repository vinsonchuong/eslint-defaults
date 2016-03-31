import * as path from 'path';
import Directory from 'directory-helpers';

const eslintBin = path.resolve('node_modules/eslint/bin/eslint.js');
const eslintDefaultsBin = path.resolve('node_modules/.bin/eslint');

class Project extends Directory {
  async exec(...args) {
    try {
      return await super.exec(...args);
    } catch ({message}) {
      return message;
    }
  }

  async expectSameOutput(eslintDefaultArgs, eslintArgs) {
    const actual = await this.exec(eslintDefaultsBin, eslintDefaultArgs);
    const expected = await this.exec(eslintBin,
      ['-c', '_eslintrc', ...(eslintArgs || eslintDefaultArgs)]);
    expect(actual).toBe(expected);
  }
}

describe('eslint', () => {
  afterEach(async () => {
    await new Project('project').remove();
  });

  it('preserves CLI flags', async () => {
    const project = new Project('project');
    await project.write({_eslintrc: ''});
    await project.expectSameOutput(['-h']);
  });

  it('can lint ES5', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        rules: {
          'no-debugger': 2
        }
      },
      'src/index.js': `
        debugger;
      `
    });
    await project.expectSameOutput(['src/index.js']);
  });

  it('can lint ES.next', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        parser: 'babel-eslint'
      },
      'src/index.js': `
        import * as path from 'path';
        path.resolve();
      `
    });
    await project.expectSameOutput(['src/index.js']);
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
      'src/index.js': `
        async function run() {
          await Promise.resolve(42);
        }
        run();
      `
    });
    await project.expectSameOutput(['src/index.js']);
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
      'src/index.js': `
        export * from 'fs';
        export * as fse from 'fs';
      `
    });
    await project.expectSameOutput(['src/index.js']);
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
      'src/index.js': `
        const {one, two, ...rest} = {one: 1, two: 2, three: 3, four: 4};
        JSON.stringify({one, two, ...rest});
      `
    });
    await project.expectSameOutput(['src/index.js']);
  });

  it('defaults to linting the current directory', async () => {
    const project = new Project('project');
    await project.write({
      '_eslintrc': {
        rules: {
          'no-debugger': 2
        }
      },
      'src/index.js': `
        debugger;
      `
    });
    await project.expectSameOutput([], ['src/index.js']);
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
        src/index.js
      `,
      'src/index.js': `
        debugger;
      `
    });
    await project.expectSameOutput([], ['--ignore-path', '.gitignore', '.']);
  });
});
