import React from 'react';
import {connect} from 'react-redux'
import InputField from './InputField';
import {Route} from 'react-router'
import {push} from "react-router-redux";



export class UserForm extends React.Component {

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };

    render() {
        return (
            <div id="userForm__root">
                <div className="formWrapper__userForm">
                    <button onClick={this.goToTheURL} name='/userform/signup'>Sign Up</button>
                    <button onClick={this.goToTheURL} name='/userform/login'>Log in</button>
                    <Route path='/userform/signup' component={InputField}/>
                    <Route exact path='/userform/login' render={(props) => (
                        <InputField {...props} login />
                    )}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        push: location => dispatch(push(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);