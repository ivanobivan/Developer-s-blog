import React from 'react'
import {connect} from "react-redux";
import {signUp} from "../../actions/AppActions";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    handleChangeName = event => {
        this.setState({username: event.target.value});
    };

    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        this.props.signUp(this.state.username, this.state.password);
    };

    render() {
        return(
            <div>
                <fieldset>
                    <legend>Sign up</legend>
                    <input type='text' name="username" value={this.state.username} onChange={this.handleChangeName}/>
                    <input type='text' name="username" value={this.state.password}
                           onChange={this.handleChangePassword}/>
                    <button onClick={this.handleSubmit}>sign up</button>
                </fieldset>
                <p>Answer from DB [{this.props.store.signUpFailure}]</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        store: state.simpleReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: (username, password) => dispatch(signUp(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);