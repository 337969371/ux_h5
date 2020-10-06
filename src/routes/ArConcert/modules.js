// ------------------------------------
// Constants
// ------------------------------------
import {Toast} from "antd-mobile";
import { postCD } from "../../utils/api";


export const getGift = (params) => {
    return (dispatch, getState) => {
        return postCD("prize/receivePrize",dispatch,params).then(res=>{
            Toast.info("领取成功！");
        });
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
