// ------------------------------------
// Constants
// ------------------------------------
import {Toast} from "antd-mobile";
import {postCD, postPush} from "../../utils/api";
import {addGlobalData} from "../../store/global";



export const postPushData = (params) => {
    return (dispatch, getState) => {
        return postPush("forum/post/add",dispatch,params).then(res=>{
            if(res){
                Toast.info("发表成功！");
                return true;
            }
        });
    }
}
export const getMemberInfo = () => {
    return (dispatch, getState) => {
        return  postCD('customer/memberInfo', dispatch,{})
    }
}
export const showLogin = (params) => {
    return (dispatch, getState) => {
        dispatch(addGlobalData({showLogin: true}));
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
