import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import { LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LOG_IN_REQUEST, LOG_OUT_REQUEST, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, FOLLOW_REQUEST, UNFOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE } from '../reducers/user';


function followApi(data : any){
    return axios.post('/api/follow', data);
}

function* follow(action : any){
    try{
        console.log(action.data);
        //const result = yield call(followApi, action.data);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        });
    }catch(err : any){
        console.log(err);
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data
        });
    }

}
function unfollowApi(data : any){
    return axios.post('/api/unfollow', data);
}

function* unfollow(action : any){
    try{
        //const result = yield call(unfollowApi, action.data);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        });
    }catch(err : any){
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        });
    }

}

function logInApi(data : any){
    return axios.post('/api/login', data);
}

function* logIn(action : any){
    try{
        //const result = yield call(logInApi, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
            //data: result.data
        });
    }catch(err : any){
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        });
    }

}

function logOutApi(){
    return axios.post('/api/logout');
}

function* logOut(){
    try{
        //const result = yield call(logOutApi);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
        //    data: result.data
        });
    }catch(err : any){
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        });
    }

}


function signUpApi(){
    return axios.post('/api/signup');
}

function* signUp(){
    try{
        //const result = yield call(signUpApi);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
        //    data: result.data
        });
    }catch(err : any){
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        });
    }

}

function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}


export default function* userSaga(){
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}