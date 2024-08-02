import { BundlibConfig } from 'bundlib';

const config: BundlibConfig = {
  interop: true,
  esModule: true,
  min: ['browser', 'module'],

  name: 'toRoman',
  equals: true,

  project: 'tsconfig-build.json',
};

export default config;
