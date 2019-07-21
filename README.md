# Typed Redux Saga

An attempt to bring better TypeScript typing to redux-saga.

Requires TypeScript 3.6.

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