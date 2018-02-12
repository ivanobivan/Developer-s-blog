import React from 'react';
import axios from 'axios'
import Toolbar from './Toolbar'
import '../less/index.less'

export default class App extends React.Component {

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

    render() {
        return (
            <main>
                <button onClick={this.sendData}>BUTTON</button>
            </main>
        )
    }
}
