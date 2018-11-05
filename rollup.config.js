import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify-es';
import license from 'rollup-plugin-license';
import pkg from './package.json';

const banner = `/*!
 * ${pkg.realname} v${pkg.version}
 * (c) 2017-${new Date().getFullYear()} ${pkg.author}
 * MIT License.
 */
`;

export default {
  input: `src/${pkg.name}.js`,
  output: [
    {
      banner,
      file: pkg.main,
      format: 'iife',
      name: pkg.realname,
    },
    {
      banner,
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    eslint({
      include: '{src,tests}/**/*.js',
      throwOnError: true,
      throwOnWarning: true,
    }),
    resolve(),
    babel(),
    uglify(),
    // This plugin is a work-around for compilation
    // issues when allowing comments in uglify
    license({
      banner,
    }),
  ],
};
