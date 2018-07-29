import React from 'react';
import {Route} from 'react-router'
import Loadable from 'react-loadable';
import Toolbar from '../components/Toolbar/Toolbar'
import Chat from '../components/Chat/Chat'
import {COMPONENT} from "../constants/const";
import "../less/app/application.less";
import {push} from "react-router-redux";
import {checkUser, logOut} from "../actions/serverActions";
import {connect} from "react-redux";


const Loading = () => <div>Loading...</div>;

const HomeComponent = Loadable({
    loader: () => import('../components/Home'),
    loading: Loading,
});

const UserFormComponent = Loadable({
    loader: () => import('../components/UserForm/UserForm'),
    loading: Loading,
});

const AboutMeComponent = Loadable({
    loader: () => import('../components/AboutMe/AboutMe'),
    loading: Loading,
});

const AdminComponent = Loadable({
    loader: () => import('../components/Admin/Admin'),
    loading: Loading,
});


const ChessBoardComponent = Loadable({
    loader: () => import('../components/Chess/ChessBoard'),
    loading: Loading,
});


class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socketWasInitialized: false,
            test: false
        };
        sessionStorage.setItem("loaded", true);
    }

    shouldComponentUpdate(nextProps, nextState) {
    }

    initializeSocket = () => {
        this.setState({socketWasInitialized: true})
    };

    goToTheURL = (event) => {
        this.props.push(event.target.dataset.link);
    };

    render() {
        return (
            <main>
                <Toolbar
                    COMPONENT={COMPONENT}
                    server={this.props.server}
                    goToTheURL={this.goToTheURL}
                />
                <Route exact path='/' component={HomeComponent}/>
                <Route path="/userform" component={UserFormComponent}/>
                <Route path="/posts" component={ChessBoardComponent}/>
                <Route path="/aboutme" component={AboutMeComponent}/>
                <Route path="/admin" component={AdminComponent}/>
                <Route path="/chat" render={() =>
                    <Chat socketWasInitialized={this.state.socketWasInitialized}
                          initializeSocket={this.initializeSocket}/>}/>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        server: state.server
    };
};

const mapDispatchToProps = dispatch => {
    return {
        push: location => dispatch(push(location)),
        checkUser: () => dispatch(checkUser()),
        logOut: () => dispatch(logOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);