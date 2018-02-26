import React from 'react'
import {connect} from "react-redux";

class Description extends React.Component {

    render() {
        return(
            <div>
                <p>TEST</p>
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