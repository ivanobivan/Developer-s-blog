import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {changeApi} from '../actions/AppActions'
import '../less/index.less'


class App extends React.Component {

    sendData = () => {
        axios.post('/test', {
            name: "Ivan",
            password: "Password"
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    };

    sessionTest = () => {
        axios.post('/session', {}).then(res => console.log(res));
    };

    changeApiOne = () => {
        this.props.changeApi("api1")
    };
    changeApiTwo = () => {
        this.props.changeApi("api2")
    };

    getSession =() => {
        axios.post("/session").then(res => console.log(res)).catch(err => console.log(err));
    };
    getSession1 =() => {
        axios.post("/bar").then(res => console.log(res)).catch(err => console.log(err));
    };
    getSession2 =() => {
        axios.post("/foo").then(res => console.log(res)).catch(err => console.log(err));
    };
    render() {
        return (
            <div>
                <button onClick={this.changeApiOne}>b1</button>
                <button onClick={this.changeApiTwo}>b2</button>
                <button onClick={this.getSession}>session</button>
                <button onClick={this.getSession}>bar</button>
                <button onClick={this.getSession}>foo</button>
                <p>{this.props.simpleReducer.api}</p>
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