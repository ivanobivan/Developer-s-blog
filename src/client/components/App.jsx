import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {changeApi} from '../actions/AppActions'
import '../less/index.less'


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'test',
            password: 'test',
            signUpResponse: 'not answer',
            loginResponse: 'not checked',
            loginName: 'test',
            loginPassword: 'test'
        }
    }

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
    handleChangeLoginName = event => {
        this.setState({loginName: event.target.loginName});
    };

    handleChangeLoginPassword = event => {
        this.setState({loginPassword: event.target.loginPassword});
    };
    handleSubmitForLogin = event => {
        console.log(`Form's params: ${this.state.loginName} - ${this.state.loginPassword}`);
        this.login(this.state.loginName, this.state.loginPassword);
    };

    changeApiOne = () => {
        this.props.changeApi("api1")
    };
    changeApiTwo = () => {
        this.props.changeApi("api2")
    };

    getSession = () => {
        axios.post("/session", {})
            .then(res => console.log(res))
            .catch(err => console.log(err));
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
    login = (username, password) => {
        axios.post("/auth/login", {
            username: username,
            password: password
        })
            .then(res => {
                console.log(res);
                this.setState({loginResponse: res.data.message})
            })
            .catch(err => {
                console.log(err);
                this.setState({loginResponse: err})
            });
    };
    dashboard = () => {
        axios.post("/api/dashboard", {})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <button onClick={this.changeApiOne}>test reducer</button>
                <button onClick={this.changeApiTwo}>test reducer again</button>
                <p>The result of testing: [{this.props.simpleReducer.api}] </p>
                <button onClick={this.getSession}>get express-session</button>
                <form>
                    <input type='text' name='username' value={this.state.name} onChange={this.handleChangeName}/>
                    <input type='text' name='password' value={this.state.password}
                           onChange={this.handleChangePassword}/>
                </form>
                <button onClick={this.handleSubmit}>sign up</button>
                <p>answer from DB: [{this.state.signUpResponse}]</p>
                <form>
                    <input type='text' name='username' value={this.state.loginName} onChange={this.handleChangeLoginName}/>
                    <input type='text' name='password' value={this.state.loginPassword}
                           onChange={this.handleChangeLoginPassword}/>
                </form>
                <button onClick={this.handleSubmitForLogin}>check login</button>
                <p>answer from login request: [{this.state.loginResponse}]</p>
                <br/>
                <button onClick={this.dashboard}>get dashboard</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        simpleReducer: state.simpleReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeApi: message => dispatch(changeApi(message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);