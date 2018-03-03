import {
    USER_LEVEL,
    SERVER_ERROR,
    SIGN_UP,
    LOG_IN,
    LOG_OUT
} from "../constants/serverConstants";

const initialState = {
    level: "unknown",
    serverError: {},
    signUpFailure: "",
    logInFailure: "",
    logoutRes: ""
};

const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LEVEL :
            return {
                level: action.level
            };
        case SERVER_ERROR:
            const status = action.err.response ? action.err.response.status ?
                action.err.response.status : 500 : 500;
            return {
                serverError: {
                    code: status,
                    name: action.err.name || null,
                    message: action.err.message || null,
                    stack: action.err.stack || null
                }
            };
        case SIGN_UP:
            return {
                signUpFailure: action.signUpFailure
            };
        case LOG_IN:
            return {
                logInFailure: action.logInFailure
            };
        case LOG_OUT:
            return {
                logoutRes: action.logoutRes,
                level: "unknown"
            };
        default:
            return state;
    }
};

export default serverReducer;