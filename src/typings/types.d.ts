declare module 'typed-redux-saga' {
  import { Action } from 'redux';

  export * from 'typed-redux-saga/dist/index';
  export function takeEvery<A extends Action>(
    pattern: A['type'],
    worker: (action: A) => any,
  )
}
