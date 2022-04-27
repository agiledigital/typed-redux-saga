# Typed Redux Saga

[![npm](https://img.shields.io/npm/v/typed-redux-saga.svg)](https://www.npmjs.com/package/typed-redux-saga)
[![Build Status](https://travis-ci.org/agiledigital/typed-redux-saga.svg?branch=master)](https://travis-ci.org/agiledigital/typed-redux-saga)
[![Type Coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fagiledigital%2Ftyped-redux-saga%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![codecov](https://codecov.io/gh/agiledigital/typed-redux-saga/branch/master/graph/badge.svg?token=ZNTWQNDKL8)](https://codecov.io/gh/agiledigital/typed-redux-saga)

An attempt to bring better TypeScript typing to redux-saga.

Requires TypeScript 3.6 or later.

## Installation

```sh
# yarn
yarn add typed-redux-saga

# npm
npm install typed-redux-saga
```

## Usage

Let's take the example from https://redux-saga.js.org/#sagasjs

### Before

```typescript
import { call, all } from "redux-saga/effects";
// Let's assume Api.fetchUser() returns Promise<User>
// Api.fetchConfig1/fetchConfig2 returns Promise<Config1>, Promise<Config2>
import Api from "...";

function* fetchUser(action) {
  // `user` has type any
  const user = yield call(Api.fetchUser, action.payload.userId);
  ...
}

function* fetchConfig() {}
  // `result` has type any
  const result = yield all({
    api1: call(Api.fetchConfig1),
    api2: call(Api.fetchConfig2),
  });
  ...
}
```

### After

```typescript
// Note we import `call` from typed-redux-saga
import { call, all } from "typed-redux-saga";
// Let's assume Api.fetchUser() returns Promise<User>
// Api.fetchConfig1/fetchConfig2 returns Promise<Config1>, Promise<Config2>
import Api from "...";

function* fetchUser(action) {
  // Note yield is replaced with yield*
  // `user` now has type User, not any!
  const user = yield* call(Api.fetchUser, action.payload.userId);
  ...
}

function* fetchConfig() {}
  // Note yield is replaced with yield*
  // `result` now has type {api1: Config1, api2: Config2}
  const result = yield* all({
    api1: call(Api.fetchConfig1),
    api2: call(Api.fetchConfig2),
  });
  ...
}
```

## Babel Macro

You can use the built-in [babel macro](
https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md)
that will take care of transforming all your effects to raw redux-saga effects.

Install the babel macros plugin:

```sh
yarn add --dev babel-plugin-macros
```

Modify your import names to use the macro:

```js
import {call, race} from "typed-redux-saga/macro";

// And use the library normally
function* myEffect() {
  yield* call(() => "foo");
}
```

The previous code will be transpiled at compile time to raw redux-saga effects:

```js
import {call, race} from "redux-saga/effects";

function* myEffect() {
  yield call(() => 'foo');
}
```

This gives you all the benefits of strong types during development without
the overhead induced by all the calls to `typed-redux-saga`'s proxies.

## ESLint Rules

In order to avoid accidentally importing the original effects instead of the typed effects, you can use this ESLint plugin:
https://github.com/jambit/eslint-plugin-typed-redux-saga

It includes an auto-fix option, so you can use it to easily convert your codebase from redux-saga to typed-redux-saga!

## Credits

Thanks to all the [contributors](https://github.com/agiledigital/typed-redux-saga/graphs/contributors) and especially thanks to [@gilbsgilbs](https://github.com/gilbsgilbs) for his huge contribution.

## See Also

* https://github.com/danielnixon/eslint-config-typed-fp
* https://github.com/danielnixon/eslint-plugin-total-functions
* https://github.com/danielnixon/readonly-types
* https://github.com/jonaskello/eslint-plugin-functional
* https://github.com/gcanti/fp-ts
* https://github.com/plantain-00/type-coverage
