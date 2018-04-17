import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from "../reducers"
import {routerMiddleware} from "react-router-redux";
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();
import persistState from 'redux-localstorage'

const configureStore = (history) => {
    const routeMiddleware = routerMiddleware(history);
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk),
            applyMiddleware(logger),
            applyMiddleware(sagaMiddleware),
            applyMiddleware(routeMiddleware)
        )
    );
};

export default configureStore;