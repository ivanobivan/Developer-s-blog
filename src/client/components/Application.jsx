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
import Chat from './Chat/Chat'
import configureStore from "../store/configureStore"
import createHistory from "history/createHashHistory";
import "../less/app/application.less";

const history = createHistory();
const store = configureStore(history);
const env = process.env.SERVER_TYPE;

export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socketWasInitialized: false
        };
        sessionStorage.setItem("loaded", true);
    }

    initializeSocket = () => {
        this.setState({socketWasInitialized: true})
    };

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Toolbar env={env}/>
                        <Route exact path='/' component={Home}/>
                        <Route path="/userform" component={UserForm}/>
                        <Route path="/posts" component={Posts}/>
                        <Route path="/aboutme" component={AboutMe}/>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/serverError" component={ServerError}/>
                        <Route path="/chat" render={() =>
                            <Chat socketWasInitialized={this.state.socketWasInitialized}
                                  initializeSocket={this.initializeSocket}/>}/>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}



