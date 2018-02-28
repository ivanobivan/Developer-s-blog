import React from 'react'
import {connect} from "react-redux";

class Description extends React.Component {

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

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);