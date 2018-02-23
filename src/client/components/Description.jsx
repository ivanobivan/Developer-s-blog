import React from 'react'
import {changeApi} from "../actions/AppActions";
import {connect} from "react-redux";

class Main extends React.Component {

    render() {
        return(
            <div>
                <h1>Welcome to the DESCRIPTION page</h1>
                <hr/>
                <h3>This page is under development</h3>
                <hr/>
                <p>I am glad to see you on this page
                    <br/>
                    Please, add this page in favorites and follow the development</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);