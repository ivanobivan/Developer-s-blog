import React from 'react';
import {Provider} from "react-redux";
import {Route} from 'react-router'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import Main from './Main'
import Toolbar from './Toolbar'
import Description from './Description'
import test from './test'
import configureStore from "../store/configureStore"
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(middleware);

export default class Application extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Toolbar/>
                        <hr/>
                        <Route exact path="/" component={Main}/>
                        <Route path="/description" component={Description}/>
                        <Route path="/test" component={test}/>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}



