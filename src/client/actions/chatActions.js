import {
    SEND_MESSAGE,
    FORWARD_MESSAGE,
    GET_USERS_LIST,
    SET_USER_PULL
} from "../constants/chatConstants";
import socketIOClient from "socket.io-client";

const socket = socketIOClient('http://192.168.1.2:5050');

export const sendMessage = message => {
    socket.emit('send_message', message);
    return {
        type: SEND_MESSAGE,
        message: message
    }
};
export const addMessage = message => {
    return {
        type: FORWARD_MESSAGE,
        message: message
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