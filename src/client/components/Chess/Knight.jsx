import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {KNIGHT} from '../../constants/const';



const knightSource = {
    beginDrag(props) {
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}


class Knight extends Component {

    componentDidMount() {
        const img = new Image();
        img.src = this.props.image.src;
        img.alt = this.props.image.alt;
        img.onload = () => this.props.connectDragPreview(img);
    }

    render() {
        const {connectDragSource, isDragging} = this.props;
        return connectDragSource(
            <div
                className='knight'
                style={{
                    opacity: isDragging ? 0.5 : 1,
                }}>
                ♘
            </div>
        );
    }
}

export default  DragSource(KNIGHT, knightSource, collect)(Knight);