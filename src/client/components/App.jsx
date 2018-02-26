import React from 'react';
import {Route} from 'react-router'
import Main from './Main'
import Toolbar from '../components/Header/Toolbar'
import AuthPage from './AuthPage'
import Description from './Description'


export default class App extends React.Component {
    render() {
        return (
            <div>
                <Toolbar/>
                <hr/>
                <Route exact path="/" component={Main}/>
                <Route path='/login' component={AuthPage}/>
                <Route path="/description" component={Description}/>
            </div>
        )
    }
}



