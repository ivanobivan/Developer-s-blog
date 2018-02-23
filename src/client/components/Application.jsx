import React from 'react';
import {Provider} from "react-redux";
import {Route} from 'react-router'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import Main from './Main'
import Toolbar from '../components/Header/Toolbar'
import AuthPage from './AuthPage'
import Description from './Description'
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
                        <Route path='/login' component={AuthPage}/>
                        <Route path="/description" component={Description}/>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}



