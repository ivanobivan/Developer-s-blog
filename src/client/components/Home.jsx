import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {checkUser, logOut} from '../actions/serverActions'

const env = process.env.SERVER_TYPE;

export class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };

    componentDidMount() {
        if (env !== "storybook") {
            this.props.checkUser();
        }
    }

    logOutUser = () => {
        this.props.logOut();
    };

    render() {
        const level = this.props.server.level;
        return (
            <div id="home__root">
                <h1>Welcome to my page</h1>
                <h2>Please, push the buttons</h2>
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