import {
    USER_LEVEL,
    SERVER_ERROR,
    SIGN_UP,
    LOG_IN,
    LOG_OUT
} from "../constants/constants";

const initialValue = {
    level: "unknown",
    serverError: "",
    signUpFailure: "",
    logInFailure: "",
    logoutRes: ""
};

const searchAttributes = (state = initialValue, action) => {
    switch (action.type) {
        case USER_LEVEL :
            return {
                level: action.level
            };
        case SERVER_ERROR:
            return {
                serverError: action.err
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

export default searchAttributes;