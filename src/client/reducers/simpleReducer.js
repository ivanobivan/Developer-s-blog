import {
    TEST,
    USER_LEVEL,
    SERVER_ERROR,
    SIGN_UP,
    LOG_IN,
    REDIRECT
} from "../constants/constants";

const initialValue = {
    api: "api0",
    level: "unknown",
    serverError: "",
    signUpFailure: "",
    loginResponse: ""
};

const searchAttributes = (state = initialValue, action) => {
    switch (action.type) {
        case TEST:
            return {
                api : "123"
            };
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
        default:
            return state;
    }
};

export default searchAttributes;