import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
    session: sessionReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));