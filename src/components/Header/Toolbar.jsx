import React from 'react'
import {changelocation} from "../../actions/AppActions";
import {connect} from "react-redux";
import {push} from 'react-router-redux'

class Toolbar extends React.Component {

    changelocation1 =() => {
        this.props.push("/");
    };
    changelocation2 =() => {
        this.props.push("/main");
    };
    changelocation3 =() => {
        this.props.push("/admin");
    };
    render() {
        return(
            <nav>
                <a onClick={this.changelocation1}>Home</a>
                {" "}
                <a onClick={this.changelocation2}>Main</a>
                {" "}
                <a onClick={this.changelocation3}>Admin</a>
            </nav>
        )
    }
}
const mapStateToProps = state => {
    console.log("state", state);
    return {

    };
};

export default connect(mapStateToProps, {push: location => (push(location)) })(Toolbar);