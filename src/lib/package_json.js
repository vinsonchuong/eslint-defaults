import path from 'path';

const dependencyProps = [
  'dependencies',
  'devDependencies',
  'peerDependencies'
];

export default class PackageJson {
  static load() {
    try {
      const json = require(path.resolve('package.json'));
      return new PackageJson(json);
    } catch (e) {
      throw new Error('Please run this from the project root directory');
    }
  }

  constructor(json) {
    this.dependencies = Array.from(
      dependencyProps
        .map(prop => json[prop])
        .filter(Boolean)
        .map(Object.keys)
        .reduce((depsMemo, deps) =>
          deps.reduce((depMemo, dep) =>
            depMemo.add(dep),
          depsMemo),
        new Set())
    );
  }

  dependsOn(pattern) {
    return this.dependencies.some(dep => dep.match(pattern));
  }

  dependsOnSome(...patterns) {
    return patterns.some(pattern => this.dependsOn(pattern));
  }
}
