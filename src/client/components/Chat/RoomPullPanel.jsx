import React from 'react'
import FontAwesome from 'react-fontawesome';
export default class RoomPullPanel extends React.Component {

    changeActiveRoom = (event) => {
        const text = event.target.innerText.trim();
        if(this.props.activeRoom !== text) {
            this.props.changeActiveRoom(text)
        }
    };

    render() {
        const {activeRoom} = this.props;
        return (
            <div className="roomPanel__messagePanel">
                {this.props.roomPull.map((elem,index) => {
                    const activeStyle = activeRoom === elem.name ? {"background-color" : "#30a6d5"} : {};
                    return (
                        <div
                            key={index}
                            ref={elem.name.trim()}
                            className="titleRoom__roomPanel"
                            style={activeStyle}
                            onClick={this.changeActiveRoom}
                        >
                            {elem.name.trim()}
                            <FontAwesome className="closeRoom__roomPanel" name='close' title="Leave room"/>
                        </div>
                    )
                })}
            </div>
        )
    }
}