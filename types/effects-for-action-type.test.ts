/* eslint-disable functional/no-let */
/* eslint-disable functional/no-this-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/functional-parameters */

import { SagaIterator, channel, buffers } from "redux-saga";
import {
  effectsForActionType,
  SagaGenerator,
} from "typed-redux-saga/effects-for-action-type";

type FooAction = { readonly type: "FOO" };
type BarAction = { readonly type: "BAR" };
type MyAction = FooAction | BarAction;

const Effects = effectsForActionType<MyAction>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* mySaga(): SagaGenerator<void> {
  yield* Effects.take("FOO"); // $ExpectType MyAction
  yield* Effects.take<FooAction>("FOO"); // $ExpectType FooAction
  yield* Effects.takeMaybe("FOO"); // $ExpectType MyAction
  yield* Effects.takeMaybe<FooAction>("FOO"); // $ExpectType FooAction

  const chan = channel<"FOO">();
  yield* Effects.take(chan); // $ExpectType "FOO"
  yield* Effects.takeMaybe(chan); // $ExpectType "FOO"

  yield* Effects.takeEvery("FOO", function* () {}); // $ExpectType never
  yield* Effects.takeEvery(chan, function* () {}); // $ExpectType never

  yield* Effects.takeLatest("FOO", function* () {}); // $ExpectType never
  yield* Effects.takeLatest(chan, function* () {}); // $ExpectType never

  yield* Effects.takeLeading("FOO", function* () {}); // $ExpectType never
  yield* Effects.takeLeading(chan, function* () {}); // $ExpectType never

  yield* Effects.put({ type: "FOO" }); // $ExpectType { type: "FOO"; }
  yield* Effects.put(chan, "FOO"); // $ExpectType "FOO"

  yield* Effects.putResolve({ type: "FOO" }); // $ExpectType { type: "FOO"; }

  // $ExpectType number
  yield* Effects.call(function (): number {
    return 22;
  });

  // $ExpectType number
  yield* Effects.call(() => 22);

  // $ExpectType number
  yield* Effects.call(function (): Promise<number> {
    return Promise.resolve(22);
  });

  // $ExpectType number
  yield* Effects.call(function* (): SagaIterator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  function someApiCall(): number {
    return 1;
  }

  function someSelect(): number {
    return 1;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function* doStuff() {
    // $ExpectType number
    yield* Effects.call(someApiCall);

    // $ExpectType number
    yield* Effects.select(someSelect);
  }

  const person = {
    firstName: "John",
    lastName: "Doe",
    id: 5566,
    fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    },
  };

  // $ExpectType string
  yield* Effects.apply(person, "fullName", []);

  // $ExpectType number
  yield* Effects.cps((): number => 22);

  // $ExpectType FixedTask<number>
  let task = yield* Effects.fork(function* (): SagaIterator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  // $ExpectType FixedTask<number>
  task = yield* Effects.spawn(function* (): SagaIterator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  // $ExpectType void
  yield* Effects.join(task);

  // $ExpectType void
  yield* Effects.cancel(task);

  // $ExpectType number
  yield* Effects.select(
    (state: { readonly foo: number }): number => state.foo,
  );

  // $ExpectType Channel<MyAction>
  yield* Effects.actionChannel("FOO");

  // $ExpectType Channel<FooAction>
  yield* Effects.actionChannel<FooAction>("FOO");

  // $ExpectType Channel<FooAction>
  const fooChan = yield* Effects.actionChannel<FooAction>(
    "FOO",
    buffers.sliding<FooAction>(5),
  );
  // $ExpectType FooAction
  yield* Effects.take(fooChan);

  // $ExpectType "FOO"[]
  yield* Effects.flush(chan);

  // $ExpectType boolean
  yield* Effects.cancelled();

  // $ExpectType void
  yield* Effects.setContext({ foo: "bar" });

  // $ExpectType string
  yield* Effects.getContext<string>("foo");

  // $ExpectType void
  yield* Effects.delay(120);

  // $ExpectType boolean
  yield* Effects.delay(120, true);

  // $ExpectType never
  yield* Effects.throttle(25, "FOO", function* (): SagaIterator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  // $ExpectType never
  yield* Effects.debounce(25, "FOO", function* (): SagaIterator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  // $ExpectType number
  yield* Effects.retry(5, 100, function* (): SagaIterator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  // $ExpectType number[]
  yield* Effects.all([
    Effects.call(function* (): SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
    Effects.call(function* (): SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
  ]);

  // $ExpectType { foo: number; bar: string; }
  yield* Effects.all({
    foo: Effects.call(function* (): SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
    bar: Effects.call(function* (): SagaGenerator<string> {
      yield* Effects.take(chan);
      return "hello";
    }),
  });

  // $ExpectType (number | undefined)[]
  yield* Effects.race([
    Effects.call(function* (): SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
    Effects.call(function* (): SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
  ]);

  // $ExpectType { foo: number | undefined; bar: string | undefined; }
  yield* Effects.race({
    foo: Effects.call(function* (): SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
    bar: Effects.call(function* (): SagaGenerator<string> {
      yield* Effects.take(chan);
      return "hello";
    }),
  });
}
