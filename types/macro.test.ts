/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */

import * as Effects from "typed-redux-saga/macro";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* mySaga(): Effects.SagaGenerator<void> {
  // $ExpectType number
  yield* Effects.call(function* (): Effects.SagaGenerator<number> {
    yield* Effects.take("OK");
    return 22;
  });
}
