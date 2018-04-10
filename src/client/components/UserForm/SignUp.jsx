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
        return(
            <div id="signUp__userForm__root">
                <fieldset>
                    <p>Sign Up</p>
                    <input type='text' name="username" value={this.state.username} onChange={this.handleChangeName} placeholder="Username*"/>
                    <input type='password' name="username" value={this.state.password}
                           onChange={this.handleChangePassword} placeholder="Password*"/>
                    <button onClick={this.handleSubmit}>sign up</button>
                    <span>Answer from DB [{this.props.serverRes.signUpFailure}]</span>
                </fieldset>
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