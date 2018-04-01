import {
    SEND_MESSAGE,
    FORWARD_MESSAGE,
    GET_USERS_LIST,
    SET_USER_PULL
} from "../constants/chatConstants";
import socketIOClient from "socket.io-client";

/*local server socket*/
//const socket = socketIOClient('http://192.168.1.2:5050');

/*public server socket*/
const socket = socketIOClient('http://185.117.155.32:5050');


export const sendMessage = (message, username) => {
    socket.emit('send_message', {
        message:message,
        username:username
    });
    return {
        type: SEND_MESSAGE,
        message: message
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