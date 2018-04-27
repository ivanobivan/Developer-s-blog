import {
    SEND_MESSAGE,
    FORWARD_MESSAGE,
    GET_USERS_LIST,
    SET_USER_PULL,
    CLEAR_MESSAGE_PULL,
    ADD_ROOM,
    CHANGE_ACTIVE_ROOM
} from "../constants/chatConstants";
import socketIOClient from "socket.io-client";

let socket = null;
if (process.env.SERVER_TYPE === 'public') {
    socket = socketIOClient('http://185.117.155.32:5050');
} else if (process.env.SERVER_TYPE === "local") {
    socket = socketIOClient('http://192.168.1.4:5050');
}

export const changeActiveRoom = (room) => {
    return {
        type: CHANGE_ACTIVE_ROOM,
        room: room
    }
};

export const addMessage = req => {
    return {
        type: FORWARD_MESSAGE,
        req: req
    }
};
export const getUsersList = username => {
    socket.emit('get_users_list', username);
    return {
        type: GET_USERS_LIST,
        username: username
    }
};
export const setUserPull = userPull => {
    return {
        type: SET_USER_PULL,
        userPull: userPull
    }
};
export const clearMessagePull = (room) => {
    return {
        type: CLEAR_MESSAGE_PULL,
        room: room
    }
};
export const addRoom = (room, visibility, friendName) => {
    return {
        type: ADD_ROOM,
        room: room,
        visibility: visibility,
        friendName: friendName
    }
};