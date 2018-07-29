import React from 'react';
import Loadable from 'react-loadable';
import Toolbar from '../components/Toolbar/Toolbar'
import {COMPONENT} from "../constants/const";
import "../less/app/application.less";
import {checkUser, logOut, switchComponent} from "../actions/serverActions";
import {connect} from "react-redux";
import AboutMe from "../components/AboutMe/AboutMe";


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

    initializeSocket = () => {
        this.setState({socketWasInitialized: true})
    };

    switchComponent = (event) => {
        this.props.switchComponent(event.target.dataset.link);
    };

    render() {
        const {server} = this.props;
        let component = null;
        switch (server.currentPage) {
            case 'home': {
                component = HomeComponent;
                break
            }
            case 'userForm': {
                component = UserFormComponent;
                break
            }
            case 'aboutMe': {
                component = AboutMeComponent;
                break
            }
            default : {
                break
            }
        }
        return (
            <main>
                <Toolbar
                    server={server}
                    switchComponent={this.switchComponent}
                />
                {component}
                {/*<Route exact path='/' component={HomeComponent}/>
                <Route path="/userform" component={UserFormComponent}/>
                <Route path="/posts" component={ChessBoardComponent}/>
                <Route path="/aboutme" component={AboutMeComponent}/>
                <Route path="/admin" component={AdminComponent}/>
                <Route path="/chat" render={() =>
                    <Chat socketWasInitialized={this.state.socketWasInitialized}
                          initializeSocket={this.initializeSocket}/>}/>*/}
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
        checkUser: () => dispatch(checkUser()),
        logOut: () => dispatch(logOut()),
        switchComponent: page => dispatch(switchComponent(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);