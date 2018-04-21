import {
    FORWARD_MESSAGE,
    SET_USER_PULL,
    CLEAR_MESSAGE_PULL,
    ADD_ROOM,
    CHANGE_ACTIVE_ROOM
} from "../constants/chatConstants";

const initialState = {
    userPull: [],
    activeRoom: "common+",
    roomPull: [
        {
            name: 'common+',
            visibility: true,
            messagePull: []
        }
    ]
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORWARD_MESSAGE:
            const {username, message, room} = action.req;
            const currentRoomPull = state.roomPull.find(e => e.name === room);
            const index = state.roomPull.findIndex(e => e.name === room);
            currentRoomPull.messagePull = [...currentRoomPull.messagePull,
                {
                    username: username,
                    message: message
                }];
            state.roomPull.slice(index, 1).push(currentRoomPull);
            const sender = state.userPull.find(elem => elem.username === username);
            const senderIndex = state.userPull.findIndex(elem => elem.username === username);
            if(!currentRoomPull.visibility) {
                sender.notReadMessages = currentRoomPull.messagePull.length;
                state.userPull.slice(senderIndex,1).push(sender);
            }
            /*const slicePull = state.messagePull.length > 1000 ? state.messagePull.slice(0, 100) :
                state.messagePull;*/
            return {
                ...state,
                roomPull: state.roomPull,
                userPull: state.userPull
            };
        case CLEAR_MESSAGE_PULL:
            const roomForClear = state.roomPull.find(elem => elem.name === action.room);
            const indexRoom = state.roomPull.findIndex(elem => elem.name === action.room);
            roomForClear.messagePull = [];
            state.roomPull.slice(indexRoom, 1).push(roomForClear);
            return {
                ...state,
                roomPull: state.roomPull
            };
        case SET_USER_PULL:
            return {
                ...state,
                userPull: action.userPull
            };
        case ADD_ROOM:
            return {
                ...state,
                roomPull: [
                    ...state.roomPull,
                    {
                        name: action.room,
                        visibility: action.visibility, messagePull: []
                    }
                ]
            };
        case CHANGE_ACTIVE_ROOM :
            return {
                ...state,
                activeRoom: action.room
            };
        default:
            return state;
    }
};

export default chatReducer;