export {SEND_MESSAGE} from '../constants/chatConstants'

export const sendMessage = message => {
    return {
        type: SEND_MESSAGE,
        message: message
    }
};