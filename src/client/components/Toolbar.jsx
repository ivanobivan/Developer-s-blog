import React from 'react'
import {changelocation} from "../actions/serverActions";
import {connect} from "react-redux";
import {push} from 'react-router-redux'

class Toolbar extends React.Component {

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };
    render() {
        return(
            <nav>
                <a onClick={this.goToTheURL} name="/">Home</a>
                {" "}
                <a onClick={this.goToTheURL} name='/posts'>Posts</a>
                {" "}
                {this.props.serverRes.level === "unknown" ?
                    <a onClick={this.goToTheURL} name='/userform'>User</a>
                    : null
                }
                {" "}
                <a onClick={this.goToTheURL} name='/aboutme'>About</a>
                <a onClick={this.goToTheURL} name='/admin'>Admin</a>
            </nav>
        )
    }
}
const mapStateToProps = state => {
    return {
        serverRes: state.serverReducer
    };
};

export default connect(mapStateToProps, {push: location => (push(location)) })(Toolbar);