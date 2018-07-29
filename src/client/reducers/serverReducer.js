/* eslint-disable no-case-declarations */
import {
    USER_LEVEL,
    USER_NAME,
    SERVER_ERROR,
    SIGN_UP,
    LOG_IN,
    LOG_OUT,
    SWITCH_COMPONENT
} from '../constants/const';

const initialState = {
    currentPage: '',
    username: null,
    level: 'unknown',
    serverError: {},
    signUpFailure: '',
    logInFailure: '',
    logoutRes: ''
};

const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LEVEL :
            return {
                ...state,
                level: action.level
            };
        case USER_NAME :
            return {
                ...state,
                username: action.username
            };
        case SERVER_ERROR:
            const status = action.err.response ? action.err.response.status ?
                action.err.response.status : 500 : 500;
            return {
                ...state,
                serverError: {
                    code: status,
                    name: action.err.name || null,
                    message: action.err.message || null,
                    stack: action.err.stack || null
                }
            };
        case SIGN_UP:
            return {
                ...state,
                signUpFailure: action.signUpFailure
            };
        case LOG_IN:
            return {
                ...state,
                logInFailure: action.logInFailure
            };
        case LOG_OUT:
            return {
                ...state,
                logoutRes: action.logoutRes,
                level: 'unknown',
                username: null
            };
        case SWITCH_COMPONENT: {
            return {
                ...state,
                currentPage: action.page
            };
        }
        default:
            return state;
    }
};

export default serverReducer;