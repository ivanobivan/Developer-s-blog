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
        const loginFail = this.props.serverRes.logInFailure;
        return (
            <div id="logIn__userForm__root">
                <p>Log in</p>
                <form>
                    <input type='text' name="username" autoFocus value={this.state.username}
                           onChange={this.handleChangeName}
                           placeholder="Username*"
                           maxlength="12"
                           maxlength="6"
                           pattern="[\d\w][А-Я]{6,12}"
                           required
                    />
                    <input type='text' name='password' value={this.state.password}
                           onChange={this.handleChangePassword}
                           placeholder="Password*"
                           maxlength="12"
                           maxlength="6"
                           required
                    />
                    <button type="submit" className="logInButton__logIn" onClick={this.handleSubmit}>Log in</button>
                </form>
                {loginFail ? <div className="dbAnswer__logIn">Answer from DB [{loginFail}]</div> : null}

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