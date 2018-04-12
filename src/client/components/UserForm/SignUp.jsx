import React from 'react'
import {connect} from "react-redux";
import {signUp} from "../../actions/serverActions";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChangeName = event => {
        this.setState({username: event.target.value});
    };

    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        this.props.signUp(this.state.username, this.state.password);
    };

    render() {
        const signUpFail = this.props.serverRes.signUpFailure;
        return (
            <div id="signUp__userForm__root">
                <p>Sign Up</p>
                <input type='text' autoFocus
                       name="username" value={this.state.username} onChange={this.handleChangeName}
                       placeholder="Username*"
                       pattern="^[\w\d]{6,12}"
                />
                <input type='password' name="username" value={this.state.password}
                       onChange={this.handleChangePassword} placeholder="Password*"/>
                <button className="signUpButton__signUp" onClick={this.handleSubmit}>sign up</button>
                {signUpFail ? <div className="dbAnswer__signUp">Answer from DB [{signUpFail}]</div> : null}
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
        signUp: (username, password) => dispatch(signUp(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);