/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import pkg from "./package.json";

export default {
  input: ["src/index.js", "src/macro.js"],
  output: [
    {
      dir: "dist/cjs/",
      format: "cjs",
      exports: "auto",
    },
    {
      dir: "dist/es/",
      format: "es",
      exports: "auto",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};
