import React from 'react'
import {connect} from "react-redux";

class Description extends React.Component {

    render() {
        return(
            <div id="posts_root">
                <h1>Welcome to the Posts page</h1>
                <h3>This page is under development</h3>
                <p>I am glad to see you on this page
                    Please, add this page in favorites and follow the development</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Description);