import {all} from "redux-saga/effects";

export function* watcherSaga() {
}

export default function* rootSaga() {
    yield all([
        watcherSaga()
    ]);
};
