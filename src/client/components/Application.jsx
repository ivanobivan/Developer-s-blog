import React from 'react';
import {Provider} from "react-redux";
import {Route} from 'react-router'
import {ConnectedRouter} from 'react-router-redux'
import UserForm from './UserForm/UserForm'
import Toolbar from './Toolbar'
import Posts from './Posts'
import Home from "./Home"
import Admin from "./Admin/Admin"
import AboutMe from './AboutMe/AboutMe'
import ServerError from './Server/ServerError'
import configureStore from "../store/configureStore"
import createHistory from "history/createBrowserHistory";
import "../less/app/application.less";

const history = createHistory();
const store = configureStore(history);

export default class Application extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Toolbar/>
                        <Route exact path='/' component={Home}/>
                        <Route path="/userform" component={UserForm}/>
                        <Route path="/posts" component={Posts}/>
                        <Route path="/aboutme" component={AboutMe}/>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/serverError" component={ServerError}/>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}



