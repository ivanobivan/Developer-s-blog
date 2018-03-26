import React from 'react'
import {connect} from 'react-redux'


export default class Chat extends React.Component {

    render() {
        return (
            <div id="chat__root">
                <div id="test">
                    <aside className="usersPanel__chat">
                        users
                    </aside>
                    <section className="chatSide__chat">
                        <section className="messagePanel__chatSide">
                            message
                        </section>
                        <section className="inputPanel__chatSide">
                            input
                        </section>
                    </section>

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
