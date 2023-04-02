import axios from 'axios'
import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import postSaga from './post';
import userSaga from './user';

export default function* rootSaga(){
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}