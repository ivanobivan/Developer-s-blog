import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import Toolbar from './Toolbar'
import {changeApi} from '../actions/actions'
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

    changeApiOne= () => {
      this.props.changeApi("api1")
    };
    changeApiTwo= () => {
        this.props.changeApi("api2")
    };

    render() {
        return (
            <main>
                <button onClick={this.changeApiOne}>BUTTON</button>
                <button onClick={this.changeApiTwo}>BUTTON2</button>
                <span>{this.props.api}</span>
            </main>
        )
    }
}
const mapStateToProps = state => {
    return {
        rootReducer: state.rootReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeApi: () => dispatch(changeApi(message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);