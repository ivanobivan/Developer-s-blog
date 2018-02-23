import React from 'react'
import axios from "axios/index";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            signUpResponse: 'not answer',
            loginResponse: 'not checked',
            loginName: '',
            loginPassword: '',
            level: 'user',
            dashboard: 'not available'
        }
    }
    /*------------------------LOG IN PART--------------------------------*/
    handleChangeLoginName = event => {
        this.setState({loginName: event.target.value});
    };
    handleChangeLoginPassword = event => {
        this.setState({loginPassword: event.target.value});
    };
    handleSubmitForLogin = event => {
        console.log(`Form's params: ${this.state.loginName} - ${this.state.loginPassword}`);
        this.login(this.state.loginName, this.state.loginPassword);
    };
    login = (username, password) => {
        axios.post("/auth/login", {
            username: username,
            password: password
        })
            .then(res => {
                console.log(res);
                this.setState({loginResponse: res.data.message});
                this.setState({level: res.data.level});
            })
            .catch(err => {
                console.log(err);
                this.setState({loginResponse: err})
            });
    };
    /*------------------------SIGN UP PART--------------------------------*/
    handleChangeName = event => {
        this.setState({name: event.target.value});
    };

    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        console.log(`Form's params: ${this.state.name} - ${this.state.password}`);
        this.signUp(this.state.name, this.state.password);
    };

    signUp = (username, password) => {
        axios.post("/auth/signup", {
            username: username,
            password: password
        })
            .then(res => {
                console.log(res);
                this.setState({signUpResponse: res.data.message})
            })
            .catch(err => {
                console.log(err);
                this.setState({signUpResponse: err})
            });
    };
    render() {
        return(
            <div>
                <p>Please LOG IN or SIGN UP</p>
                <fieldset>
                    <legend>log in</legend>
                    <input type='text' name="username" value={this.state.loginName} onChange={this.handleChangeLoginName}/>
                    <input type='text' name='password' value={this.state.loginPassword}
                           onChange={this.handleChangeLoginPassword}/>
                    <button onClick={this.handleSubmitForLogin}>Log in</button>
                </fieldset>
                <p>If you haven't an account then create it</p>
                <fieldset>
                    <legend>sign up</legend>
                    <input type='text' name="username" value={this.state.name} onChange={this.handleChangeName}/>
                    <input type='text' name="username" value={this.state.password}
                           onChange={this.handleChangePassword}/>
                    <button onClick={this.handleSubmit}>sign up</button>
                </fieldset>
            </div>
        )
    }
}
