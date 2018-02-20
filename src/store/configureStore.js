import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from "../reducers"


const configureStore = (middleware) => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(middleware),
            applyMiddleware(thunk),
            applyMiddleware(logger)
        )
    );
};

export default configureStore;