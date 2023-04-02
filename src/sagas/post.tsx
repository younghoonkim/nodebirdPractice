import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, generateDummyPosts, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from "@/reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "@/reducers/user";
import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import shortId from 'shortid';

function loadPostsApi(data : any){
    return axios.get('/api/posts');
}

function* loadPosts(action : any){
    try{
        //const result = yield call(addPostApi,action.data);
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPosts(10),
        });
    }catch(err : any){
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        });
    }

}

function addPostApi(data : any){
    return axios.post('/api/post');
}

function* addPost(action : any){
    try{
        //const result = yield call(addPostApi,action.data);
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data
            }
        });
        yield put({
            type: ADD_POST_TO_ME,
            data : id            
        });
    }catch(err : any){
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        });
    }

}

function removePostApi(data : any){
    return axios.post('/api/post');
}

function* removePost(action : any){
    try{
        //const result = yield call(addPostApi,action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data : action.data            
        });
    }catch(err : any){
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data
        });
    }

}

function addCommentApi(data : any){
    return axios.post('/api/post/${data.postId}/comment');
}

function* addComment(action : any){
    try{
        //const result = yield call(addCommentApi,action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        });
    }catch(err : any){
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        });
    }

}


function* watchLoadPosts(){
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga(){
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}