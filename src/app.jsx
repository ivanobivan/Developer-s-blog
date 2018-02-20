import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from "react-redux";
import {Route} from 'react-router'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import App from './components/App'
import Toolbar from './components/Header/Toolbar'
import Admin from './components/Admin'
import Main from './components/Main'
import configureStore from "./store/configureStore"
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(middleware);

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
