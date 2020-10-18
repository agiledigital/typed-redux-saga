import plugin from "babel-plugin-macros";
import pluginTester from "babel-plugin-tester";

// eslint-disable-next-line functional/no-expression-statement
pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: {
    "named imports": `
      import {call, take} from '../src/macro'

      function* myEffect() {
        const foo = yield* take('SOME_ACTION');
        const bar = yield* call(() => 'hello');
      }
    `,
    "all and race": `
      import {all, call, race} from '../src/macro'

      function* myEffect() {
        const resAll = yield* all({
          one: call(() => 'ok'),
          two: call(() => 'ok'),
        });
        const resRace = yield* race({
          one: call(() => 'ok'),
          two: call(() => 'ok'),
        });
      }
    `,
  },
});
