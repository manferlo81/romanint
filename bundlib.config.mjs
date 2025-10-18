import { defineConfig } from 'bundlib'

export default defineConfig({
  interop: true,
  esModule: true,
  min: ['browser', 'module'],
  name: 'toRoman',
  equals: true,
  project: './tsconfig.build.json',
})
