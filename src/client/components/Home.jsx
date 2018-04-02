import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {checkUser,logOut} from '../actions/serverActions'

const env = process.env.SERVER_TYPE;
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };

    componentDidMount() {
        if(env !== "storybook") {
            this.props.checkUser();
        }
    }
    logOutUser= () => {
        this.props.logOut();
    };
    render() {
        const level = this.props.serverRes.level;
        return (
            <div id="home__root">
                <h1>Welcome to my Page, you are {this.props.serverRes.level}</h1>
                <p>You can view my posts</p>
                <button onClick={this.goToTheURL} name="/posts">View posts</button>
                {level === 'unknown' ?
                    <div>
                        <p>You can log in</p>
                        <button onClick={this.goToTheURL} name="/userform">Log in page</button>
                    </div>
                    : null
                }
                <p>You can view page about me and send me letter</p>
                <button onClick={this.goToTheURL} name="/aboutme">About me</button>
                {level !== 'unknown' ?
                    <div>
                        <p>You may log out</p>
                        <button onClick={this.logOutUser}>Log out</button>
                        <span>{this.props.serverRes.logoutRes}</span>
                    </div>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverRes: state.server
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