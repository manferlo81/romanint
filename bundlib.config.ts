import { BundlibConfig as Config } from 'bundlib';

const config: Config = {
  interop: true,
  esModule: true,
  min: ['browser', 'module'],

  name: 'toRoman',
  equals: true,

  project: 'tsconfig-build.json',
};

export default config;
