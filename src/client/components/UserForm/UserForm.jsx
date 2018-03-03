import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import SignUp from './SignUp';
import LogIn from './LogIn';
import {Route} from 'react-router'
import {push} from "react-router-redux";


class Main extends React.Component {

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };
    render() {
        return (
            <div id="userForm__root">
                <button onClick={this.goToTheURL} name='/userform/signup'>Sign Up</button>
                <button onClick={this.goToTheURL} name='/userform/login'>Log in</button>
                <Route path='/userform/login' component={LogIn}/>
                <Route path='/userform/signup' component={SignUp}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
           push: location => dispatch(push(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);