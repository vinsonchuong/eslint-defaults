import PackageJson from '../../src/lib/package_json';

describe('PackageJson', () => {
  describe('searching for dependencies', () => {
    it('searches dependencies', () => {
      const project = new PackageJson({
        dependencies: {
          'jasmine-plugin': '^1.2.3'
        }
      });

      expect(project.dependsOn(/jasmine/)).toBe(true);
      expect(project.dependsOn(/plugin/)).toBe(true);
      expect(project.dependsOn(/other/)).toBe(false);
    });

    it('searches devDependencies', () => {
      const project = new PackageJson({
        devDependencies: {
          'jasmine-plugin': '^1.2.3'
        }
      });

      expect(project.dependsOn(/jasmine/)).toBe(true);
      expect(project.dependsOn(/plugin/)).toBe(true);
      expect(project.dependsOn(/other/)).toBe(false);
    });

    it('searches linkDependencies', () => {
      const project = new PackageJson({
        linkDependencies: {
          'jasmine-plugin': '../jasmine-es6'
        }
      });

      expect(project.dependsOn(/jasmine/)).toBe(true);
      expect(project.dependsOn(/plugin/)).toBe(true);
      expect(project.dependsOn(/other/)).toBe(false);
    });

    it('searches peerDependencies', () => {
      const project = new PackageJson({
        peerDependencies: {
          'jasmine-plugin': '^1.2.3'
        }
      });

      expect(project.dependsOn(/jasmine/)).toBe(true);
      expect(project.dependsOn(/plugin/)).toBe(true);
      expect(project.dependsOn(/other/)).toBe(false);
    });

    it('searches for one of multiple dependencies', () => {
      const project = new PackageJson({
        dependencies: {
          'jasmine-plugin': '^1.2.3'
        },
        devDependencies: {
          'gulp-plugin': '^1.2.3'
        }
      });

      expect(project.dependsOnSome(/jasmine/, /gulp/)).toBe(true);
      expect(project.dependsOnSome(/other/, /gulp/)).toBe(true);
      expect(project.dependsOnSome(/other/, /nothing/)).toBe(false);
    });
  });

  it('can directly load the package.json in the cwd', () => {
    expect(PackageJson.load().dependsOn(/jasmine/)).toBe(true);
  });
});
