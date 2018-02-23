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
            loginPassword: 'test',
            level: 'user',
            dashboard: 'not available'
        }
    }
    dashboard = () => {
        axios.get("/api/dashboard", {})
            .then(res => {
                this.setState({dashboard: res.data.message})
            })
            .catch(err => console.log(err));
    };
    logout = () => {
        axios.get('/logout',{})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    render() {
        return (
            <div>
                <p>answer from DB: [{this.state.signUpResponse}]</p>
                <p>answer from login request: [{this.state.loginResponse}]</p>
                <p>User's status: [{this.state.level}]</p>
                <br/>
                <button onClick={this.logout}>Log out</button>
                <br/>
                <button onClick={this.dashboard}>get dashboard</button>
                <p>dashboard is [{this.state.dashboard}]</p>
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