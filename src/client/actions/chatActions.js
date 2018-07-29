import {
    FORWARD_MESSAGE,
    SET_USER_PULL,
    CLEAR_MESSAGE_PULL,
    ADD_ROOM,
    CHANGE_ACTIVE_ROOM,
    DELETE_ROOM
} from "../constants/const";


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
export const deleteRoom = (room) => {
    return {
        type:DELETE_ROOM,
        room:room
    }
};