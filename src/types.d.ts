import 'typed-redux-saga';

declare module 'typed-redux-saga' {
  export function takeEvery<A>(
    pattern: A['type'],
    worker: (action: A) => any,
  )
}
