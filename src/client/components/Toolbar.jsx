import React from 'react'
import {changelocation} from "../actions/serverActions";
import {connect} from "react-redux";
import {push} from 'react-router-redux'

class Toolbar extends React.Component {

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };

    render() {
        const level = this.props.serverRes.level;
        return (
            <nav id="toolbar__root">
                <a onClick={this.goToTheURL} name="/">Home</a>
                <a onClick={this.goToTheURL} name='/posts'>Posts</a>
                {level === "unknown" ?
                    <a onClick={this.goToTheURL} name='/userform'>Log in</a>
                    : null
                }
                <a onClick={this.goToTheURL} name='/aboutme'>About</a>
                {level === "admin" ?
                    <a onClick={this.goToTheURL} name='/admin'>Admin</a>
                    : this.props.env === 'storybook' ? <a onClick={this.goToTheURL} name='/admin'>Admin</a> : null
                }
                {level !== "unknown" ?
                    <a onClick={this.goToTheURL} name="/chat">Chat</a>
                    : this.props.env === 'storybook' ? <a onClick={this.goToTheURL} name="/chat">Chat</a> : null
                }
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverRes: state.server
    };
};

export default connect(mapStateToProps, {push: location => (push(location))})(Toolbar);