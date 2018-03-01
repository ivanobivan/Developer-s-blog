import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from "../reducers"
import {routerMiddleware} from "react-router-redux";

const configureStore = (history) => {
    const routeMiddleware = routerMiddleware(history);
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk),
            applyMiddleware(logger),
            applyMiddleware(routeMiddleware)
        )
    );
};

export default configureStore;