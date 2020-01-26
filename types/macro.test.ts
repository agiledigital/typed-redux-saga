import * as Effects from "typed-redux-saga/macro";
import { SagaIterator } from "redux-saga";

function* mySaga(): Effects.SagaGenerator<void> {
  // $ExpectType number
  yield* Effects.call(function*(): SagaIterator<number> {
    yield* Effects.take('OK');
    return 22;
  });
}
