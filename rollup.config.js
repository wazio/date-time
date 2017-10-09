import sourceMaps from 'rollup-plugin-sourcemaps';

const pkg = require('./package.json');

export default {
  input: './compiled/index.js',
  output: [
    {file: pkg.main, name: 'wazio.dateTime', format: 'umd'},
    {file: pkg.module, format: 'es'},
  ],
  sourcemap: true,
  plugins: [
    sourceMaps()
  ]
};
