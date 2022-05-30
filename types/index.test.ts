/* eslint-disable functional/no-let */
/* eslint-disable functional/no-this-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/functional-parameters */

import { channel, buffers } from "redux-saga";
import * as Effects from "typed-redux-saga";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* mySaga(): Effects.SagaGenerator<void> {
  yield* Effects.take("FOO"); // $ExpectType Action<any>
  type FooAction = { readonly type: "FOO" };
  yield* Effects.take<FooAction>("FOO"); // $ExpectType FooAction
  yield* Effects.takeMaybe("FOO"); // $ExpectType Action<any>
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

  yield* Effects.put({ type: "FOO" }); // $ExpectType { type: string; }
  yield* Effects.put(chan, "FOO"); // $ExpectType "FOO"

  yield* Effects.putResolve({ type: "FOO" }); // $ExpectType { type: string; }

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
  yield* Effects.call(function* (): Effects.SagaGenerator<number> {
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
  let task = yield* Effects.fork(function* (): Effects.SagaGenerator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  // $ExpectType FixedTask<number>
  task = yield* Effects.spawn(function* (): Effects.SagaGenerator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  // $ExpectType number
  yield* Effects.join(task);

  // $ExpectType void
  yield* Effects.cancel(task);

  // $ExpectType number
  yield* Effects.select(
    (state: { readonly foo: number }): number => state.foo,
  );

  // $ExpectType Channel<Action<any>>
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
  yield* Effects.throttle(
    25,
    "FOO",
    function* (): Effects.SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    },
  );

  // $ExpectType never
  yield* Effects.debounce(
    25,
    "FOO",
    function* (): Effects.SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    },
  );

  // $ExpectType number
  yield* Effects.retry(5, 100, function* (): Effects.SagaGenerator<number> {
    yield* Effects.take(chan);
    return 22;
  });

  // $ExpectType number[]
  yield* Effects.all([
    Effects.call(function* (): Effects.SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
    Effects.call(function* (): Effects.SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
  ]);

  // $ExpectType { foo: number; bar: string; }
  yield* Effects.all({
    foo: Effects.call(function* (): Effects.SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
    bar: Effects.call(function* (): Effects.SagaGenerator<string> {
      yield* Effects.take(chan);
      return "hello";
    }),
  });

  // $ExpectType (number | undefined)[]
  yield* Effects.race([
    Effects.call(function* (): Effects.SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
    Effects.call(function* (): Effects.SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
  ]);

  // $ExpectType { foo: number | undefined; bar: string | undefined; }
  yield* Effects.race({
    foo: Effects.call(function* (): Effects.SagaGenerator<number> {
      yield* Effects.take(chan);
      return 22;
    }),
    bar: Effects.call(function* (): Effects.SagaGenerator<string> {
      yield* Effects.take(chan);
      return "hello";
    }),
  });

  function outer<T>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    emit: (item: T) => T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler: (item: T) => T,
  ) {}
  const obj = { outer };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function makeEmit<T>(x: T, y: T) {
    return (item: T) => item;
  }

  function handler(item: number) {
    return item;
  }
  const emitter = makeEmit<number>(2, 3);

  yield* Effects.call(outer, emitter, handler);
  yield* Effects.call([obj, obj.outer], emitter, handler);
  yield* Effects.call([obj, "outer"], emitter, handler);
  yield* Effects.call({ context: obj, fn: obj.outer }, emitter, handler);
  yield* Effects.call({ context: obj, fn: "outer" }, emitter, handler);

  yield* Effects.apply(obj, outer, [emitter, handler]);
  yield* Effects.apply(obj, "outer", [emitter, handler]);

  yield* Effects.fork(outer, emitter, handler);
  yield* Effects.fork([obj, obj.outer], emitter, handler);
  yield* Effects.fork([obj, "outer"], emitter, handler);
  yield* Effects.fork({ context: obj, fn: obj.outer }, emitter, handler);
  yield* Effects.fork({ context: obj, fn: "outer" }, emitter, handler);

  yield* Effects.spawn(outer, emitter, handler);
  yield* Effects.spawn([obj, obj.outer], emitter, handler);
  yield* Effects.spawn([obj, "outer"], emitter, handler);
  yield* Effects.spawn({ context: obj, fn: obj.outer }, emitter, handler);
  yield* Effects.spawn({ context: obj, fn: "outer" }, emitter, handler);
}
