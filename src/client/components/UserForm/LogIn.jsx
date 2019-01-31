import React from 'react'
import {connect} from "react-redux";
import {logIn} from "../../actions/serverActions";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            logInMessage: ''
        }
    }

    handleChangeName = event => {
        this.setState({username: event.target.value});
    };
    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };
    handleSubmit = event => {
        const {username, password} = this.state;
        if (username && username.length >= 6 && username.length <= 12 && password && password.length >= 6 && password.length <= 12) {
            this.setState({signUpMessage: ''});
            this.props.logIn(username, password);
            event.preventDefault();
        } else {
            this.setState({signUpMessage: 'Please, enter the username and password with more then 6 symbols and less then 12, without spaces.'})
        }
    };


    render() {
        const loginFail = this.props.server.logInFailure;
        return (
            <div id="logIn__userForm__root">
                <p>Log in</p>
                <form>
                    <input type='text' name="username" autoFocus value={this.state.username}
                           autoComplete="username"
                           onChange={this.handleChangeName}
                           placeholder="Username*"
                           maxLength="12"
                           minLength="6"
                           pattern="^[\wа-яё]{6,12}$"
                           required
                    />
                    <input type='password' name='password' value={this.state.password}
                           autoComplete="current-password"
                           onChange={this.handleChangePassword}
                           placeholder="Password*"
                           maxLength="12"
                           minLength="6"
                           pattern="^[\wа-яё]{6,12}$"
                           required
                    />
                    <button type="submit" className="logInButton__logIn" onClick={this.handleSubmit}>Log in</button>
                </form>
                <div className="errorsWrapper__logIn">
                    {loginFail ? <div className="dbAnswer__logIn">Answer from DB<br/> [{loginFail}]</div> : null}
                    {this.state.signUpMessage ?
                        <div className="wrongNameOrPass__logIn">{this.state.signUpMessage}</div> : null}
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
        logIn: (username, password) => dispatch(logIn(username, password))
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(Login);