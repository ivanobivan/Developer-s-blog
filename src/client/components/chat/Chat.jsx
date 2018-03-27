import React from 'react'
import {connect} from 'react-redux'

export default class Chat extends React.Component {

    render() {
        return (
            <div id="chat__root">
                <div id="test">

                    <div className="usersPanel__chat">
                        users
                    </div>


                    <div className="chatSide__chat">
                        <div className="messagePanel__chatSide">
                            message
                        </div>


                        <div className="inputPanel__chatSide">
                            input
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

//export default connect(mapStateToProps, mapDispatchToProps)(Chat);
