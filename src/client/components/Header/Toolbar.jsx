import React from 'react'
import {changelocation} from "../../actions/AppActions";
import {connect} from "react-redux";
import {push} from 'react-router-redux'

class Toolbar extends React.Component {

    changelocation1 =() => {
        this.props.push("/");
    };
    changelocation2 =() => {
        this.props.push("/description");
    };
    render() {
        return(
            <nav>
                <a onClick={this.changelocation1}>Home page</a>
                {" "}
                <a onClick={this.changelocation2}>Description</a>
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