import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
const pkg = require("./package.json");

export default {
  input: 'src/index.ts',
  watch: {
    include: 'src/**'
  },
  output: [
    {
      file: pkg.main,
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    json(),
    typescript(),
    commonjs(),
    resolve(),
  ],
};
