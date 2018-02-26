import React from 'react'
import axios from "axios/index";
import {connect} from "react-redux";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            loginPassword: ''
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

    render() {
        return (
            <div>
                <p>Log in</p>
                <fieldset>
                    <legend>log in</legend>
                    <input type='text' name="username" value={this.state.loginName}
                           onChange={this.handleChangeLoginName}/>
                    <input type='text' name='password' value={this.state.loginPassword}
                           onChange={this.handleChangeLoginPassword}/>
                    <button onClick={this.handleSubmitForLogin}>Log in</button>
                </fieldset>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);