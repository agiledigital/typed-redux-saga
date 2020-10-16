// Minimum TypeScript Version: 3.6

/* eslint-disable functional/no-method-signature */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/no-return-void */

// TODO remove this eslint-disable
// eslint-disable-next-line import/no-unresolved
import { ActionMatchingPattern, Buffer } from "@redux-saga/types";
import { Action as RawAction } from "redux";
import {
  TakeableChannel,
  PuttableChannel,
  END,
  Task,
  FlushableChannel,
  Channel,
} from "redux-saga";
import {
  ActionPattern,
  TakeEffect,
  Pattern,
  ChannelTakeEffect,
  ForkEffect,
  HelperWorkerParameters,
  PutEffect,
  ChannelPutEffect,
  CallEffect,
  SagaReturnType,
  CpsCallback,
  CpsEffect,
  CpsFunctionParameters,
  JoinEffect,
  CancelEffect,
  SelectEffect,
  Tail,
  ActionChannelEffect,
  RaceEffect,
  AllEffect,
  FlushEffect,
  CancelledEffect,
  SetContextEffect,
  GetContextEffect,
  Effect,
  CallEffectDescriptor,
} from "redux-saga/effects";

export type SagaGenerator<RT, E extends Effect = Effect<any, any>> = Generator<
  E,
  RT
>;

// FIXME This should be done upstream.
// eslint-disable-next-line functional/prefer-type-literal, @typescript-eslint/consistent-type-definitions
interface FixedTask<A> extends Task {
  result: <T = A>() => T | undefined;
  toPromise: <T = A>() => Promise<T>;
}

type EffectReturnType<T> = T extends SagaGenerator<infer RT, any>
  ? RT
  : T extends CallEffect
  ? T["payload"] extends CallEffectDescriptor<infer RT>
    ? RT
    : never
  : T extends TakeEffect
  ? ActionPattern
  : unknown;

export type EffectsForActionType<Action extends RawAction> = {
  take<A extends Action>(
    pattern?: ActionPattern<A>,
  ): SagaGenerator<A, TakeEffect>;
  take<T>(
    channel: TakeableChannel<T>,
    multicastPattern?: Pattern<T>,
  ): SagaGenerator<T, ChannelTakeEffect<T>>;
  take(pattern?: ActionPattern): SagaGenerator<any, TakeEffect>;

  takeMaybe<A extends Action>(
    pattern?: ActionPattern<A>,
  ): SagaGenerator<A, TakeEffect>;
  takeMaybe<T>(
    channel: TakeableChannel<T>,
    multicastPattern?: Pattern<T>,
  ): SagaGenerator<T, ChannelTakeEffect<T>>;
  takeMaybe(pattern?: ActionPattern): SagaGenerator<any, TakeEffect>;

  takeEvery<P extends ActionPattern>(
    pattern: P,
    worker: (action: ActionMatchingPattern<P>) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeEvery<P extends ActionPattern, Fn extends (...args: any[]) => any>(
    pattern: P,
    worker: Fn,
    ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  takeEvery<A extends Action>(
    pattern: ActionPattern<A>,
    worker: (action: A) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeEvery<A extends Action, Fn extends (...args: any[]) => any>(
    pattern: ActionPattern<A>,
    worker: Fn,
    ...args: HelperWorkerParameters<A, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  takeEvery<T>(
    channel: TakeableChannel<T>,
    worker: (item: T) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeEvery<T, Fn extends (...args: any[]) => any>(
    channel: TakeableChannel<T>,
    worker: Fn,
    ...args: HelperWorkerParameters<T, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;

  takeLatest<P extends ActionPattern>(
    pattern: P,
    worker: (action: ActionMatchingPattern<P>) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLatest<P extends ActionPattern, Fn extends (...args: any[]) => any>(
    pattern: P,
    worker: Fn,
    ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLatest<A extends Action>(
    pattern: ActionPattern<A>,
    worker: (action: A) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLatest<A extends Action, Fn extends (...args: any[]) => any>(
    pattern: ActionPattern<A>,
    worker: Fn,
    ...args: HelperWorkerParameters<A, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLatest<T>(
    channel: TakeableChannel<T>,
    worker: (item: T) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLatest<T, Fn extends (...args: any[]) => any>(
    channel: TakeableChannel<T>,
    worker: Fn,
    ...args: HelperWorkerParameters<T, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;

  takeLeading<P extends ActionPattern>(
    pattern: P,
    worker: (action: ActionMatchingPattern<P>) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLeading<P extends ActionPattern, Fn extends (...args: any[]) => any>(
    pattern: P,
    worker: Fn,
    ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLeading<A extends Action>(
    pattern: ActionPattern<A>,
    worker: (action: A) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLeading<A extends Action, Fn extends (...args: any[]) => any>(
    pattern: ActionPattern<A>,
    worker: Fn,
    ...args: HelperWorkerParameters<A, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLeading<T>(
    channel: TakeableChannel<T>,
    worker: (item: T) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  takeLeading<T, Fn extends (...args: any[]) => any>(
    channel: TakeableChannel<T>,
    worker: Fn,
    ...args: HelperWorkerParameters<T, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;

  put<A extends Action>(action: A): SagaGenerator<A, PutEffect<A>>;
  put<T>(
    channel: PuttableChannel<T>,
    action: T | END,
  ): SagaGenerator<T, ChannelPutEffect<T>>;

  putResolve<A extends Action>(action: A): SagaGenerator<A, PutEffect<A>>;

  call<Fn extends (...args: any[]) => any>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;
  call<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => any;
    },
    Name extends string
  >(
    ctxAndFnName: [Ctx, Name],
    ...args: Parameters<Ctx[Name]>
  ): SagaGenerator<
    SagaReturnType<Ctx[Name]>,
    CallEffect<SagaReturnType<Ctx[Name]>>
  >;
  call<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => any;
    },
    Name extends string
  >(
    ctxAndFnName: { context: Ctx; fn: Name },
    ...args: Parameters<Ctx[Name]>
  ): SagaGenerator<
    SagaReturnType<Ctx[Name]>,
    CallEffect<SagaReturnType<Ctx[Name]>>
  >;
  call<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
    ctxAndFn: [Ctx, Fn],
    ...args: Parameters<Fn>
  ): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;
  call<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
    ctxAndFn: { context: Ctx; fn: Fn },
    ...args: Parameters<Fn>
  ): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;

  apply<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => any;
    },
    Name extends string
  >(
    ctx: Ctx,
    fnName: Name,
    args: Parameters<Ctx[Name]>,
  ): SagaGenerator<
    SagaReturnType<Ctx[Name]>,
    CallEffect<SagaReturnType<Ctx[Name]>>
  >;
  apply<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
    ctx: Ctx,
    fn: Fn,
    args: Parameters<Fn>,
  ): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;

  cps<Fn extends (cb: CpsCallback<any>) => any>(
    fn: Fn,
  ): SagaGenerator<ReturnType<Fn>, CpsEffect<ReturnType<Fn>>>;
  cps<Fn extends (...args: any[]) => any>(
    fn: Fn,
    ...args: CpsFunctionParameters<Fn>
  ): SagaGenerator<ReturnType<Fn>, CpsEffect<ReturnType<Fn>>>;
  cps<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => void;
    },
    Name extends string
  >(
    ctxAndFnName: [Ctx, Name],
    ...args: CpsFunctionParameters<Ctx[Name]>
  ): SagaGenerator<ReturnType<Ctx[Name]>, CpsEffect<ReturnType<Ctx[Name]>>>;
  cps<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => void;
    },
    Name extends string
  >(
    ctxAndFnName: { context: Ctx; fn: Name },
    ...args: CpsFunctionParameters<Ctx[Name]>
  ): SagaGenerator<ReturnType<Ctx[Name]>, CpsEffect<ReturnType<Ctx[Name]>>>;
  cps<Ctx, Fn extends (this: Ctx, ...args: any[]) => void>(
    ctxAndFn: [Ctx, Fn],
    ...args: CpsFunctionParameters<Fn>
  ): SagaGenerator<ReturnType<Fn>, CpsEffect<ReturnType<Fn>>>;
  cps<Ctx, Fn extends (this: Ctx, ...args: any[]) => void>(
    ctxAndFn: { context: Ctx; fn: Fn },
    ...args: CpsFunctionParameters<Fn>
  ): SagaGenerator<ReturnType<Fn>, CpsEffect<ReturnType<Fn>>>;

  fork<Fn extends (...args: any[]) => any>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Fn>>,
    ForkEffect<SagaReturnType<Fn>>
  >;
  fork<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => any;
    },
    Name extends string
  >(
    ctxAndFnName: [Ctx, Name],
    ...args: Parameters<Ctx[Name]>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Ctx[Name]>>,
    ForkEffect<SagaReturnType<Ctx[Name]>>
  >;
  fork<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => any;
    },
    Name extends string
  >(
    ctxAndFnName: { context: Ctx; fn: Name },
    ...args: Parameters<Ctx[Name]>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Ctx[Name]>>,
    ForkEffect<SagaReturnType<Ctx[Name]>>
  >;
  fork<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
    ctxAndFn: [Ctx, Fn],
    ...args: Parameters<Fn>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Fn>>,
    ForkEffect<SagaReturnType<Fn>>
  >;
  fork<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
    ctxAndFn: { context: Ctx; fn: Fn },
    ...args: Parameters<Fn>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Fn>>,
    ForkEffect<SagaReturnType<Fn>>
  >;

  spawn<Fn extends (...args: any[]) => any>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Fn>>,
    ForkEffect<SagaReturnType<Fn>>
  >;
  spawn<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => any;
    },
    Name extends string
  >(
    ctxAndFnName: [Ctx, Name],
    ...args: Parameters<Ctx[Name]>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Ctx[Name]>>,
    ForkEffect<SagaReturnType<Ctx[Name]>>
  >;
  spawn<
    Ctx extends {
      [P in Name]: (this: Ctx, ...args: any[]) => any;
    },
    Name extends string
  >(
    ctxAndFnName: { context: Ctx; fn: Name },
    ...args: Parameters<Ctx[Name]>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Ctx[Name]>>,
    ForkEffect<SagaReturnType<Ctx[Name]>>
  >;
  spawn<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
    ctxAndFn: [Ctx, Fn],
    ...args: Parameters<Fn>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Fn>>,
    ForkEffect<SagaReturnType<Fn>>
  >;
  spawn<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
    ctxAndFn: { context: Ctx; fn: Fn },
    ...args: Parameters<Fn>
  ): SagaGenerator<
    FixedTask<SagaReturnType<Fn>>,
    ForkEffect<SagaReturnType<Fn>>
  >;

  join(task: Task): SagaGenerator<void, JoinEffect>;
  join(tasks: Task[]): SagaGenerator<void, JoinEffect>;

  cancel(task: Task): SagaGenerator<void, CancelEffect>;
  cancel(tasks: Task[]): SagaGenerator<void, CancelEffect>;
  cancel(): SagaGenerator<void, CancelEffect>;

  select(): SagaGenerator<any, SelectEffect>;
  select<Fn extends (state: any, ...args: any[]) => any>(
    selector: Fn,
    ...args: Tail<Parameters<Fn>>
  ): SagaGenerator<ReturnType<Fn>, SelectEffect>;

  actionChannel<A extends Action>(
    pattern: ActionPattern<A>,
    buffer?: Buffer<A>,
  ): SagaGenerator<Channel<A>, ActionChannelEffect>;
  actionChannel(
    pattern: ActionPattern,
    buffer?: Buffer<Action>,
  ): SagaGenerator<Channel<Action>, ActionChannelEffect>;

  flush<T>(channel: FlushableChannel<T>): SagaGenerator<T[], FlushEffect<T>>;

  cancelled(): SagaGenerator<boolean, CancelledEffect>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  setContext<C extends object>(
    props: C,
  ): SagaGenerator<void, SetContextEffect<C>>;

  getContext<T = unknown>(prop: string): SagaGenerator<T, GetContextEffect>;

  delay<T = true>(ms: number, val?: T): SagaGenerator<T, CallEffect<T>>;

  throttle<P extends ActionPattern>(
    ms: number,
    pattern: P,
    worker: (action: ActionMatchingPattern<P>) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  throttle<P extends ActionPattern, Fn extends (...args: any[]) => any>(
    ms: number,
    pattern: P,
    worker: Fn,
    ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  throttle<A extends Action>(
    ms: number,
    pattern: ActionPattern<A>,
    worker: (action: A) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  throttle<A extends Action, Fn extends (...args: any[]) => any>(
    ms: number,
    pattern: ActionPattern<A>,
    worker: Fn,
    ...args: HelperWorkerParameters<A, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  throttle<T>(
    ms: number,
    channel: TakeableChannel<T>,
    worker: (item: T) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  throttle<T, Fn extends (...args: any[]) => any>(
    ms: number,
    channel: TakeableChannel<T>,
    worker: Fn,
    ...args: HelperWorkerParameters<T, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;

  debounce<P extends ActionPattern>(
    ms: number,
    pattern: P,
    worker: (action: ActionMatchingPattern<P>) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  debounce<P extends ActionPattern, Fn extends (...args: any[]) => any>(
    ms: number,
    pattern: P,
    worker: Fn,
    ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;
  debounce<A extends Action>(
    ms: number,
    pattern: ActionPattern<A>,
    worker: (action: A) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  debounce<A extends Action, Fn extends (...args: any[]) => any>(
    ms: number,
    pattern: ActionPattern<A>,
    worker: Fn,
    ...args: HelperWorkerParameters<A, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;

  debounce<T>(
    ms: number,
    channel: TakeableChannel<T>,
    worker: (item: T) => any,
  ): SagaGenerator<never, ForkEffect<never>>;
  debounce<T, Fn extends (...args: any[]) => any>(
    ms: number,
    channel: TakeableChannel<T>,
    worker: Fn,
    ...args: HelperWorkerParameters<T, Fn>
  ): SagaGenerator<never, ForkEffect<never>>;

  retry<Fn extends (...args: any[]) => any>(
    maxTries: number,
    delayLength: number,
    fn: Fn,
    ...args: Parameters<Fn>
  ): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;

  all<T>(effects: T[]): SagaGenerator<EffectReturnType<T>[], AllEffect<T>>;
  all<T extends { [key: string]: any }>(
    effects: T,
  ): SagaGenerator<
    { [K in keyof T]: EffectReturnType<T[K]> },
    AllEffect<T[keyof T]>
  >;

  race<T>(
    effects: T[],
  ): SagaGenerator<(EffectReturnType<T> | undefined)[], RaceEffect<T>>;
  race<T extends { [key: string]: any }>(
    effects: T,
  ): SagaGenerator<
    { [K in keyof T]: EffectReturnType<T[K]> | undefined },
    RaceEffect<T[keyof T]>
  >;
};

export type EffectsForActionTypeFunc = <
  Action extends RawAction
>() => EffectsForActionType<Action>;

export const effectsForActionType: EffectsForActionTypeFunc;
