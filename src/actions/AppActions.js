import {
    TEST,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from "../constants/constants";
import axios from 'axios'
export const changeApi = (api) => {
    return {
        type: TEST,
        api: api
    };
};

export const asynkTest = (name, password) => {
    return (dispatch, getStore) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        axios.post('/login', {
            name: name,
            password: password
        }).then(res => {
            dispatch({
                type: LOGIN_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type:LOGIN_FAILURE,
                error: err
            })
        })
    }
};
