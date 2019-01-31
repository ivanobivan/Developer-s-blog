import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

export class Announcements extends React.Component {

    render() {
        return (
            <div className="announcements__aboutMe">
                <p>Parts of site in development</p>
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