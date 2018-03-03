import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class Announcements extends React.Component {

    render() {
        return (
            <div>
                <h3>Parts of site in development</h3>
                <ul>
                    <li>Chat page</li>
                </ul>
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
        push : location => dispatch(push(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);