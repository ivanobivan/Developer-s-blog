import React from 'react'
import {connect} from "react-redux";

class ServerError extends React.Component {

    render() {
        const error = this.props.server.serverError;
        return (
            <div>
                <h2>ALARM: Server Error</h2>
                {error.name ? <p>{error.name}</p> : null}
                {error.message ? <p>{error.message}</p> : null}
                {error.stack ? <p>{error.stack}</p> : null}
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