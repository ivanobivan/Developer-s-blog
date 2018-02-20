import {routerReducer} from 'react-router-redux'
import simpleReducer from "./simpleReducer";
import { combineReducers } from "redux";

export default combineReducers({
    simpleReducer,
    router: routerReducer
});

