# Typed Redux Saga

[![npm](https://img.shields.io/npm/v/typed-redux-saga.svg)](https://www.npmjs.com/package/typed-redux-saga)
[![Build Status](https://travis-ci.org/agiledigital/typed-redux-saga.svg?branch=master)](https://travis-ci.org/agiledigital/typed-redux-saga)

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
import { call } from "redux-saga/effects";
// Let's assume Api.fetchUser() returns Promise<User>
import Api from "...";

function* fetchUser(action) {
  // `user` has type any
  const user = yield call(Api.fetchUser, action.payload.userId);
  ...
}

```

### After

```typescript
// Note we import `call` from typed-redux-saga
import { call } from "typed-redux-saga";
// Let's assume Api.fetchUser() returns Promise<User>
import Api from "...";

function* fetchUser(action) {
  // Note yield is replaced with yield*
  // `user` now has type User, not any!
  const user = yield* call(Api.fetchUser, action.payload.userId);
  ...
}
```
