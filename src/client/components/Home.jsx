import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {checkUser, logOut} from '../actions/serverActions'


export class Home extends React.Component {

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };

    componentDidMount() {
        this.props.checkUser();
    }

    logOutUser = () => {
        this.props.logOut();
    };

    render() {
        const level = this.props.server.level;
        return (
            <div id="home__root">
                <h1>Welcome</h1>
                <div className="buttonGroup__home">
                    <button onClick={this.goToTheURL} name="/posts">View posts</button>
                    {level === 'unknown' ?
                        <button onClick={this.goToTheURL} name="/userform/logIn">Log in page</button>
                        : null
                    }
                    <button onClick={this.goToTheURL} name="/aboutme">About me</button>
                    {level !== 'unknown' ?
                        <button onClick={this.logOutUser}>Log out</button>
                        : null
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);