// rollup.config.js
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';

import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import visualizer from 'rollup-plugin-visualizer';
import graph from 'rollup-plugin-graph';


const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: 'src/entry.ts',
  plugins: {
    pcalls: [
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      peerDepsExternal(),
      typescript({objectHashIgnoreUnknownHack:true}),
      postcss({extensions: [ '.css' ]}),
      commonjs(),
      json({
        exclude: 'node_modules/**'
      }),
      babel({
        runtimeHelpers: true,
        sourceMap: true,
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'],
      }),
      visualizer(),
      graph({prune:false})
    ],
  },
};

// UMD/IIFE shared settings: externals and output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const external = [
];
const globals = {
};

// Customize configs for individual targets
export default function getConfig(package_name,options={}) 
{
  let baseConfigUpd = {...baseConfig, ...options};

  const buildFormats = [];
  if (!argv.format || argv.format === 'es') {
    const esConfig = {
      ...baseConfigUpd,
      output: {
        file: 'dist/'+package_name+'.esm.js',
        format: 'esm',
        exports: 'named',
      },
      plugins: [
        ...baseConfigUpd.plugins.pcalls,
        terser({
          output: {
            ecma: 6,
          },
        }),
      ],
    };
    buildFormats.push(esConfig);
  }

  if (!argv.format || argv.format === 'cjs') {
    const umdConfig = {
      ...baseConfigUpd,
      external,
      output: {
        compact: true,
        file: 'dist/'+package_name+'.ssr.js',
        format: 'cjs',
        name: package_name,
        exports: 'named',
        globals,
      },
      plugins: [
        ...baseConfigUpd.plugins.pcalls
      ],
    };
    buildFormats.push(umdConfig);
  }

  if (!argv.format || argv.format === 'iife') {
    const unpkgConfig = {
      ...baseConfigUpd,
      external,
      output: {
        compact: true,
        file: 'dist/'+package_name+'.min.js',
        format: 'iife',
        name: package_name,
        exports: 'named',
        globals,
      },
      plugins: [
        ...baseConfigUpd.plugins.pcalls,
        terser({
          output: {
            ecma: 5,
          },
        }),
      ],
    };
    buildFormats.push(unpkgConfig);
  }//baseConfigUpd

  return buildFormats;

}

