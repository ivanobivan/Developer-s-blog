import React from 'react';
import Toolbar from './Toolbar'
import '../less/index.less'

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Toolbar/>
                <p>My first developer's blog</p>
            </div>
        )
    }
}
