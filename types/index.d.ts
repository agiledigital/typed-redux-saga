// Minimum TypeScript Version: 3.6

import { Action } from "redux";
import { EffectsForActionType } from "typed-redux-saga/effects-for-action-type";

export { SagaGenerator } from "typed-redux-saga/effects-for-action-type";

export const take: EffectsForActionType<Action>["take"];
export const takeMaybe: EffectsForActionType<Action>["takeMaybe"];
export const takeEvery: EffectsForActionType<Action>["takeEvery"];
export const takeLatest: EffectsForActionType<Action>["takeLatest"];
export const takeLeading: EffectsForActionType<Action>["takeLeading"];
export const put: EffectsForActionType<Action>["put"];
export const putResolve: EffectsForActionType<Action>["putResolve"];
export const call: EffectsForActionType<Action>["call"];
export const apply: EffectsForActionType<Action>["apply"];
export const cps: EffectsForActionType<Action>["cps"];
export const fork: EffectsForActionType<Action>["fork"];
export const spawn: EffectsForActionType<Action>["spawn"];
export const join: EffectsForActionType<Action>["join"];
export const cancel: EffectsForActionType<Action>["cancel"];
export const select: EffectsForActionType<Action>["select"];
export const actionChannel: EffectsForActionType<Action>["actionChannel"];
export const flush: EffectsForActionType<Action>["flush"];
export const cancelled: EffectsForActionType<Action>["cancelled"];
export const setContext: EffectsForActionType<Action>["setContext"];
export const getContext: EffectsForActionType<Action>["getContext"];
export const delay: EffectsForActionType<Action>["delay"];
export const throttle: EffectsForActionType<Action>["throttle"];
export const debounce: EffectsForActionType<Action>["debounce"];
export const retry: EffectsForActionType<Action>["retry"];
export const all: EffectsForActionType<Action>["all"];
export const race: EffectsForActionType<Action>["race"];
