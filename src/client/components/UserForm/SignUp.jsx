import React from 'react'
import axios from "axios/index";
import {changeApi} from "../../actions/AppActions";
import {connect} from "react-redux";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }
    }
    /*------------------------SIGN UP PART--------------------------------*/
    handleChangeName = event => {
        this.setState({name: event.target.value});
    };

    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        console.log(`Form's params: ${this.state.name} - ${this.state.password}`);
        this.signUp(this.state.name, this.state.password);
    };

    signUp = (username, password) => {
        axios.post("/auth/signup", {
            username: username,
            password: password
        })
            .then(res => {
                console.log(res);
                this.setState({signUpResponse: res.data.message})
            })
            .catch(err => {
                console.log(err);
                this.setState({signUpResponse: err})
            });
    };
    render() {
        return(
            <div>
                <fieldset>
                    <legend>Sign up</legend>
                    <input type='text' name="username" value={this.state.name} onChange={this.handleChangeName}/>
                    <input type='text' name="username" value={this.state.password}
                           onChange={this.handleChangePassword}/>
                    <button onClick={this.handleSubmit}>sign up</button>
                </fieldset>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);