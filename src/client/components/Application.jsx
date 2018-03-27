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
import Chat from './chat/Chat'
import configureStore from "../store/configureStore"
import createHistory from "history/createBrowserHistory";
import socketIOClient from 'socket.io-client'
import "../less/app/application.less";

const history = createHistory();
const store = configureStore(history);

export default class Application extends React.Component {
    constructor() {
        super();
        this.state = {
            endpoint: "http://0.0.0.0:5050",
            color: 'white'
        }
    }
    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('change color', this.state.color);
        console.log("send emit");
    };
    setColor = (color) => {
        this.setState({ color })
    };
    render() {
        const socket = socketIOClient(this.state.endpoint);
        socket.on('change color', (color) => {
            document.body.style.backgroundColor = color
        });
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
                        <Route path="/chat" component={Chat}/>
                        <button onClick={() => this.send()}>Change Color</button>
                        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                        <button id="red" onClick={() => this.setColor('red')}>Red</button>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}



