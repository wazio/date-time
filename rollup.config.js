import sourceMaps from 'rollup-plugin-sourcemaps';
const pkg = require('./package.json');

export default {
  entry: './compiled/index.js',
  targets: [
    {dest: pkg.main, moduleName: 'wazio.dateTime', format: 'umd'},
    {dest: pkg.module, format: 'es'},
  ],
  sourceMap: true,
  plugins: [
    sourceMaps()
  ]
};
