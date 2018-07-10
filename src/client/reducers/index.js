import {routerReducer} from 'react-router-redux';
import serverReducer from './serverReducer';
import adminReducer from './adminReducer';
import chatReducer from './chatReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    server: serverReducer,
    admin: adminReducer,
    chat: chatReducer,
    router: routerReducer
});
export default rootReducer;

