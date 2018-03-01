import React from 'react';
import {Provider} from "react-redux";
import {Route} from 'react-router'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import UserForm from './UserForm/UserForm'
import Toolbar from './Toolbar'
import Posts from './Posts'
import Home from "./Home"
import AboutMe from './AboutMe/AboutMe'
import configureStore from "../store/configureStore"
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const store = configureStore(history);

export default class Application extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Toolbar/>
                        <hr/>
                        <Route exact path='/' component={Home}/>
                        <Route path="/userform" component={UserForm}/>
                        <Route path="/posts" component={Posts}/>
                        <Route path="/aboutme" component={AboutMe}/>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}



