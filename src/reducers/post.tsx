import shortId from 'shortid';
import produce from 'immer';
import { faker } from '@faker-js/faker';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'younghoon'
        },
        content: '첫 게시물 #해시태그 #익스프레스',
        Images: [
            {
                id: shortId.generate(),
                src: 'https://www.ag-grid.com/static/javascript-63a7be100cadd83322fc020c36820172.svg'
            },
            {
                id: shortId.generate(),
                src: 'https://www.ag-grid.com/static/react-f098a313abafa8642511eabdfa6dfd8e.svg'
            },
            {
                id: shortId.generate(),
                src: 'https://www.ag-grid.com/static/angular-e185415c50bc1885eed6c6cc9d2b009e.svg'
            },
        ],
        Comments: [
            {
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: faker.name.fullName(),
                },
                content: '첫번째 코멘트'
            },
            {
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: 'you'
                },
                content: '두번째 코멘트'
            }
        ]
    }],
    imagePaths: [],

    hasMorePost: true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,

    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

export const generateDummyPosts = (number : number) => Array(number).fill().map((v, i) => (
    {
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.name.fullName(),
        },
        content: faker.lorem.paragraph(),
        //Images : [],
        Images : [{
            src: faker.image.image(),
        }],
        Comments : [{
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: faker.name.fullName(),
            },
            content: faker.lorem.sentence(),
        }],
    }
));

export const LOAD_POSTS_REQUEST = 'post/LOAD_POST_REQUEST';
export const LOAD_POSTS_SUCCESS = 'post/LOAD_POST_SUCCESS';
export const LOAD_POSTS_FAILURE = 'post/LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'post/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'post/ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'post/REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'post/REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'post/REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'post/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE';

export const addPost = (data : typeof initialState) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data : typeof initialState) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data : any) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: 'younghoon'
    },
    Images: [],
    Comments: []
});

const dummyComment = (data : any) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'younghoon'
    },
})

const reducer = (state = initialState, action : any) => {
    return produce(state, (draft) => {
        switch(action.type){
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.mainPosts = draft.mainPosts.concat(action.data);
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.hasMorePost = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                //draft.mainPosts = [dummyPost(action.data), ...state.mainPosts];
                draft.mainPosts.unshift(dummyPost(action.data));
                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts = state.mainPosts.filter((v: any) => v.id !== action.data);
                draft.removePostLoading = false;
                draft.removePostDone = true;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex] };
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                // };
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                break;
        }


        // immer 쓰기전
    // switch(action.type){
    //     case ADD_POST_REQUEST:
    //         return {
    //             ...state,
    //             addPostLoading: true,
    //             addPostDone: false,
    //             addPostError: null,
    //         };
    //     case ADD_POST_SUCCESS:
    //         return {
    //             ...state,
    //             mainPosts: [dummyPost(action.data), ...state.mainPosts],
    //             addPostLoading: false,
    //             addPostDone: true,
    //         };
    //     case ADD_POST_FAILURE:
    //         return {
    //             ...state,
    //             addPostLoading: false,
    //             addPostError: action.error,
    //         };
    //     case REMOVE_POST_REQUEST:
    //         return {
    //             ...state,
    //             removePostLoading: true,
    //             removePostDone: false,
    //             removePostError: null,
    //         };
    //     case REMOVE_POST_SUCCESS:
    //         return {
    //             ...state,
    //             //mainPosts: [dummyPost(action.data), ...state.mainPosts],
    //             mainPosts: state.mainPosts.filter((v: any) => v.id !== action.data),
    //             removePostLoading: false,
    //             removePostDone: true,
    //         };
    //     case REMOVE_POST_FAILURE:
    //         return {
    //             ...state,
    //             removePostLoading: false,
    //             removePostError: action.error,
    //         };
    //     case ADD_COMMENT_REQUEST:
    //         return {
    //             ...state,
    //             addCommentLoading: true,
    //             addCommentDone: false,
    //             addCommentError: null,
    //         };
    //     case ADD_COMMENT_SUCCESS: {
    //         const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
    //         const post = { ...state.mainPosts[postIndex] };
    //         post.Comments = [dummyComment(action.data.content), ...post.Comments];
    //         const mainPosts = [...state.mainPosts];
    //         mainPosts[postIndex] = post;
    //         return {
    //             ...state,
    //             mainPosts,
    //             addCommentLoading: false,
    //             addCommentDone: true,
    //         };
    //     }
    //     case ADD_COMMENT_FAILURE:
    //         return {
    //             ...state,
    //             addCommentLoading: false,
    //             addCommentError: action.error,
    //         };
    //     default:
    //         return state;
    // }
    });

}

export default reducer;

