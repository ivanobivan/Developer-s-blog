import React from 'react'
import FontAwesome from 'react-fontawesome';

export default class RoomPullPanel extends React.Component {

    changeActiveRoom = (event) => {
        const text = event.target.innerText.trim();
        if (text && this.props.activeRoom !== text) {
            this.props.changeActiveRoom(text)
        }
    };

    closeRoom = (event) => {
        event.preventDefault();
    };

    render() {
        const {activeRoom} = this.props;
        return (
            <div className="roomPanel__messagePanel">
                {this.props.roomPull.map((elem, index) => {
                    const activeStyle = activeRoom === elem.name ? {"backgroundColor": "#30a6d5"} : {};
                    return (
                        elem.visibility &&
                        <div
                            key={index}
                            ref={elem.name.trim()}
                            className="titleRoom__roomPanel"
                            style={activeStyle}
                            onClick={this.changeActiveRoom}
                        >
                            {elem.name.trim()}
                            <FontAwesome
                                className="closeRoom__roomPanel"
                                name='close'
                                title="Leave room"
                                onClick={this.closeRoom}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}