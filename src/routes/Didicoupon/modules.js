// ------------------------------------
// Constants
// ------------------------------------
import {Toast} from "antd-mobile";
import { postCD } from "../../utils/api";


export const participation = (params) => {
    return (dispatch, getState) => {
        return postCD("customer/didi/prize",dispatch,params);
    }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {

}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
