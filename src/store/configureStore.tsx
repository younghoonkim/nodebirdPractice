import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from '../reducers/index';
import createSagaMiddleware from "redux-saga";
import rootSaga from "@/sagas";

const loggerMiddleware = ({ dispatch, getState } : any) => (next : any) => (action : any) => {
    // if(typeof action === 'function'){
    //     return action(dispatch,getState);
    // }

    console.log(action);
    return next(action);
}

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware, loggerMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
                ? compose(applyMiddleware(...middleware))
                : composeWithDevTools(applyMiddleware(...middleware))
    const store = createStore(rootReducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export type AppStore = ReturnType<typeof configureStore>; // store 타입

const wrapper = createWrapper<AppStore>(configureStore ,{
    debug: process.env.NODE_ENV === 'development',
});

export default configureStore;