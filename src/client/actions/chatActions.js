import {SEND_MESSAGE,FORWARD_MESSAGE} from "../constants/chatConstants";
import socketIOClient from "socket.io-client";

const socket = socketIOClient('http://0.0.0.0:5050');

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