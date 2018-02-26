import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import '../less/index.less'


class Main extends React.Component {

    /*constructor(props) {
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
    };*/

    render() {
        return (
            <div>
                {/*<p>answer from DB: [{this.state.signUpResponse}]</p>
                <p>answer from login request: [{this.state.loginResponse}]</p>
                <p>User's status: [{this.state.level}]</p>
                <br/>
                <button onClick={this.logout}>Log out</button>
                <br/>
                <button onClick={this.dashboard}>get dashboard</button>
                <p>dashboard is [{this.state.dashboard}]</p>*/}
                <h1>Blog header</h1>
                <p>If you haven't an account then you may sign up, else you can log in</p>
                <p>Just choose</p>
                <button >Log in</button>
                <p>OR</p>
                <button >Sign Up</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);