/* eslint-disable no-case-declarations */
import {
    FORWARD_MESSAGE,
    SET_USER_PULL,
    CLEAR_MESSAGE_PULL,
    ADD_ROOM,
    CHANGE_ACTIVE_ROOM,
    DELETE_ROOM
} from '../constants/const';

const initialState = {
    userPull: [],
    activeRoom: 'common+',
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
            const pull = findObject(state.roomPull, room, 'name');
            if (pull) {
                pull.object.messagePull = [...pull.object.messagePull,
                    {
                        username: username,
                        message: message
                    }];
                state.roomPull[pull.index] = pull.object;
                let sender = findObject(state.userPull, username, 'username');
                if (!pull.object.visibility) {
                    sender.object.notReadMessages = pull.object.messagePull.length;
                    state.userPull[sender.index] = sender.object;
                }
            }
            return {
                ...state,
                roomPull: state.roomPull,
                userPull: state.userPull
            };
        case CLEAR_MESSAGE_PULL:
            const clearPull = findObject(state.roomPull, action.room, 'name');
            state.roomPull[clearPull.index].messagePull = [];
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
            const appPull = findObject(state.roomPull, action.room, 'name');
            if (appPull) {
                appPull.object.visibility = action.visibility;
                state.roomPull[appPull.index] = appPull.object;
                const sender = findObject(state.userPull, action.friendName, 'username');
                sender.object.notReadMessages = 0;
                state.userPull[sender.index] = sender.object;
            } else {
                state.roomPull.push({
                    name: action.room,
                    visibility: action.visibility,
                    messagePull: [],
                    notReadMessages: 0
                });
            }
            return {
                ...state,
                roomPull: state.roomPull,
                userPull: state.userPull
            };
        case CHANGE_ACTIVE_ROOM:
            return {
                ...state,
                activeRoom: action.room
            };
        case DELETE_ROOM:
            const indexRoom = state.roomPull.findIndex(elem => elem.name === action.room);
            if (indexRoom >= 0) {
                state.roomPull.splice(indexRoom, 1);
            }
            return {
                ...state,
                roomPull: state.roomPull,
                activeRoom: 'common+'
            };
        default:
            return state;
    }
};

const findObject = (pull, name, prefix) => {
    for (let i in pull) {
        if (pull[i][prefix] === name) {
            return {
                object: pull[i],
                index: i
            };
        }
    }
};

export default chatReducer;