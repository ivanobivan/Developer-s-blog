import React from 'react';
import {Provider} from "react-redux";
import {Route} from 'react-router'
import {ConnectedRouter} from 'react-router-redux'
import Loadable from 'react-loadable';
import Toolbar from './Toolbar'
import Chat from './Chat/Chat'
import configureStore from "../store/configureStore"
import createHistory from "history/createHashHistory";
import "../less/app/application.less";

const history = createHistory();
const store = configureStore(history);

const Loading = () => <div>Loading...</div>;

const HomeComponent = Loadable ({
    loader: () => import('./Home'),
    loading: Loading,
});

const UserFormComponent = Loadable ({
    loader: () => import('./UserForm/UserForm'),
    loading: Loading,
});

const AboutMeComponent = Loadable ({
    loader: () => import('./AboutMe/AboutMe'),
    loading: Loading,
});

const AdminComponent = Loadable ({
    loader: () => import('./Admin/Admin'),
    loading: Loading,
});

const ServerErrorComponent = Loadable ({
    loader: () => import('./Server/ServerError'),
    loading: Loading,
});

const ChessBoardComponent = Loadable ({
    loader: () => import('./Chess/ChessBoard'),
    loading: Loading,
});


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
                    <main>
                        <Toolbar/>
                        <Route exact path='/' component={HomeComponent}/>
                        <Route path="/userform" component={UserFormComponent}/>
                        <Route path="/posts" component={ChessBoardComponent}/>
                        <Route path="/aboutme" component={AboutMeComponent}/>
                        <Route path="/admin" component={AdminComponent}/>
                        <Route path="/serverError" component={ServerErrorComponent}/>
                        <Route path="/chat" render={() =>
                            <Chat socketWasInitialized={this.state.socketWasInitialized}
                                  initializeSocket={this.initializeSocket}/>}/>
                    </main>
                </ConnectedRouter>
            </Provider>
        )
    }
}



