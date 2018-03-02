import {
    TEST,
    USER_LEVEL,
    SERVER_ERROR,
    SIGN_UP,
    LOG_IN,
    REDIRECT,
    LOG_OUT
} from "../constants/constants";
import axios from 'axios'
import {push} from 'react-router-redux'

export const logOut = () => {
    return (dispatch, getStore) => {
        axios.post("/logout")
            .then(res => {
                dispatch({
                    type: LOG_OUT,
                    logoutRes: res.data.message
                })
            })
            .catch(err => {
                dispatch({
                    type: SERVER_ERROR,
                    serverError: err
                })

            })
    }
};
export const signUp = (username, password) => {
    return (dispatch, getStore) => {
        axios.post("/auth/signup", {
            username: username,
            password: password
        })
            .then(res => {
                if (res.data.err) {
                    dispatch({
                        type: SERVER_ERROR,
                        serverError: res.data.err
                    })
                }else if(res.data.path) {
                    dispatch(push(res.data.path))
                } else {
                    dispatch({
                        type: SIGN_UP,
                        signUpFailure: res.data.message
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: SERVER_ERROR,
                    serverError: err
                })
            });
    }
};

export const checkUser = () => {
    return (dispatch, getStore) => {
        axios.post('/api/checkUser', {})
            .then(res => {
                dispatch({
                    type: USER_LEVEL,
                    level: res.data.level
                })
            })
            .catch(err => {
                dispatch({
                    type: SERVER_ERROR,
                    serverError: err
                })
            })
    }
};


export const logIn = (username, password) => {
    return (dispatch, getStore) => {
        axios.post("/auth/login", {
            username: username,
            password: password
        })
            .then(res => {
                if (res.data.err) {
                    dispatch({
                        type: SERVER_ERROR,
                        serverError: res.data.err
                    })
                }else if(res.data.path) {
                    dispatch(push(res.data.path))
                } else {
                    dispatch({
                        type: LOG_IN,
                        logInFailure: res.data.message
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: SERVER_ERROR,
                    serverError: err
                })
            });
    }
};