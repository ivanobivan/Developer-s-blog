import React from 'react'
import {connect} from "react-redux";

class ServerError extends React.Component {

    render() {
        const error = this.props.server.serverError;
        return (
            <div id="serverError_root">
                {error.code ? <h1>{error.code}</h1> : null}
                {error.name ? <p>The error's name: {error.name}</p> : null}
                {error.message ? <p>The error's message{error.message}</p> : null}
                {error.stack ? <p>The error's stack{error.stack}</p> : null}
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