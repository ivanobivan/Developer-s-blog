import React from 'react';
import {connect} from 'react-redux'
class Admin extends React.Component {

    render() {
        return (
            <div>
                Admin page
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);