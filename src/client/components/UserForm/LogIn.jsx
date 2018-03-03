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
            <div>
                <fieldset>
                    <legend>log in</legend>
                    <input type='text' name="username" value={this.state.username}
                           onChange={this.handleChangeName}/>
                    <input type='text' name='password' value={this.state.password}
                           onChange={this.handleChangePassword}/>
                    <button onClick={this.handleSubmit}>Log in</button>
                </fieldset>
                <p>Answer from DB [{this.props.serverRes.logInFailure}]</p>
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