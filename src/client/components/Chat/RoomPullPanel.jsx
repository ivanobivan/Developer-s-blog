import React from 'react'

export default class RoomPullPanel extends React.Component {

    changeActiveRoom = (event) => {
        const dataCross = Boolean(event.target.dataset.cross);
        if (!dataCross) {
            const text = event.target.dataset.info;
            if (text && this.props.activeRoom !== text) {
                this.props.changeActiveRoom(text)
            }
        }
    };

    closeRoom = (event) => {
        const room = event.target.dataset.info;
        this.props.closeRoom(room);
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
                            data-info={elem.name.trim()}
                            className="titleRoom__roomPanel"
                            style={activeStyle}
                            onClick={this.changeActiveRoom}
                        >
                            {elem.name.trim()}
                            {elem.name.trim() !== 'common+' &&
                            <span
                                className="closeRoom__roomPanel"
                                title="Leave room"
                                data-info={elem.name.trim()}
                                data-cross={true}
                                onClick={this.closeRoom}
                            >&#215;</span>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}