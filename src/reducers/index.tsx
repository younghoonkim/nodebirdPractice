import React from 'react';
import { HYDRATE } from 'next-redux-wrapper';
import user from './user'
import post from '@/reducers/post'
import { combineReducers } from 'redux';

export type stateType = any;

// export type stateType = {
//     post : {
//         id: number,
//         User: any,
//         content: string,
//         createAt: object,
//         Comments: object[],
//         Images: object[],
//         addPostLoading: boolean,
//         addPostDone: boolean,
//         addPostError: any,
    
//         addCommentLoading: boolean,
//         addCommentDone: boolean,
//         addCommentError: any,
//     },
//     user: {
//         logInLoading: boolean,
//         logInDone: boolean,
//         logInError: any,
//         logOutLoading: boolean,
//         logOutDone: boolean,
//         logOutError: any,
//         signUpLoading: boolean,
//         signUpDone: boolean,
//         signUpError: any,
//         me: any,
//         signUpData: object,
//         loginDate: object
//     }

// };

const initialState = {
    user: {
    },
    post: {
    }
};


// const initialState = {
//     name: 'younghoon',
//     age: 34,
//     password: 'test'
// };

// //action creater
// const changeNickname = (data: string) => {
//     return {
//         type: 'CHANGE_NICKNAME',
//         data: data
//     };
// }

// changeNickname('aengam');

// const changeNickname = {
//     type: 'CHANGE_NICKNAME',
//     data: 'aengam'
// }

const rootReducer = combineReducers({
    index: (state = {}, action : any) => {
        switch(action.type){
            case HYDRATE:
                console.log('HYDRATE', action);
                return {...state as object, ...action};
            
            default:
                return state;
        }
    },
    user,
    post
});

export default rootReducer;