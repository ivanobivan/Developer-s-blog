import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from "react-redux";
import createHistory from 'history/createBrowserHistory'
import {Route} from 'react-router'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import App from './components/App'
import Toolbar from './components/Header/Toolbar'
import Admin from './components/Admin'
import Main from './components/Main'
import {createStore, applyMiddleware} from "redux";
import simpleReducer from "./reducers/simpleReducer";
import {combineReducers} from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
    combineReducers({
        simpleReducer,
        router: routerReducer
    }),
    composeWithDevTools(applyMiddleware(middleware),
    applyMiddleware(thunk),
    applyMiddleware(logger))
);

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Toolbar/>
                <Route exact path="/" component={App}/>
                <Route path="/main" component={Main}/>
                <Route path="/admin" component={Admin}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
