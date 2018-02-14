import React from 'react'
import {changelocation} from "../../actions/AppActions";
import {connect} from "react-redux";
import {push} from 'react-router-redux'

class Toolbar extends React.Component {

    changelocation1 =() => {
        this.props.push("/");
    };
    changelocation2 =() => {
        this.props.push("/admin");
    };
    render() {
        return(
            <nav>
                <a onClick={this.changelocation1}>Home</a>
                <a onClick={this.changelocation2}>Admin</a>
            </nav>
        )
    }
}
const mapStateToProps = state => {
    console.log("state", state);
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        push: location => dispatch(push(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);