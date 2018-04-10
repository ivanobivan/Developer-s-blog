import React from 'react'
import {connect} from "react-redux";
import {logIn} from "../../actions/serverActions";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChangeName = event => {
        this.setState({username: event.target.value});
    };
    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };
    handleSubmit = event => {
        this.props.logIn(this.state.username, this.state.password);
    };


    render() {
        return (
            <div id="logIn__userForm__root">
                <p>Log in</p>
                <input type='text' name="username" value={this.state.username}
                       onChange={this.handleChangeName}
                       placeholder="Username*"/>
                <input type='text' name='password' value={this.state.password}
                       onChange={this.handleChangePassword}
                       placeholder="Password*"/>
                {/*<span>Answer from DB [{this.props.serverRes.logInFailure}]</span>*/}
                <button className="logInButton__logIn" onClick={this.handleSubmit}>Log in</button>
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
        logIn: (username, password) => dispatch(logIn(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);