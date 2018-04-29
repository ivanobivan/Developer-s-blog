import React from 'react'
import {connect} from "react-redux";

class ServerError extends React.Component {

    render() {
        const error = this.props.server.serverError;
        return (
            <div id="serverError_root">
                {error.code && <h1>error.code</h1>}
                {error.name && <p>error.name</p>}
                {error.message && <p>error.message</p>}
                {error.stack && <p>error.stack</p>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        server: state.server
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerError);