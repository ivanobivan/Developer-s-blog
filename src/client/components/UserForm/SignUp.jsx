import React from 'react'
import {connect} from "react-redux";
import {signUp} from "../../actions/serverActions";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            signUpMessage: ''
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
            this.props.signUp(username, password);
            event.preventDefault();
        } else {
            this.setState({signUpMessage: 'Please, enter the username and password with more then 6 symbols and less then 12, without spaces.'})
        }
    };

    render() {
        const signUpFail = this.props.server.signUpFailure;
        return (
            <div id="signUp__userForm__root">
                <p>Sign Up</p>
                <form>
                    <input type='text' autoFocus
                           name="username" value={this.state.username} onChange={this.handleChangeName}
                           autoComplete="username"
                           placeholder="Username*"
                           maxLength="12"
                           minLength="6"
                           pattern="^[\wа-яё]{6,12}$"
                           required
                    />
                    <input type='password' name="password" value={this.state.password}
                           autoComplete="current-password"
                           onChange={this.handleChangePassword}
                           placeholder="Password*"
                           maxLength="12"
                           minLength="6"
                           pattern="^[\wа-яё]{6,12}$"
                           required
                    />
                </form>
                <button type="submit" className="signUpButton__signUp" onClick={this.handleSubmit}>sign up</button>
                <div className="errorsWrapper__signUp">
                    {signUpFail ? <div className="dbAnswer__signUp">Answer from DB<br/> [{signUpFail}]</div> : null}
                    {this.state.signUpMessage ?
                        <div className="wrongNameOrPass__signUp">{this.state.signUpMessage}</div> : null}
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
        signUp: (username, password) => dispatch(signUp(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);