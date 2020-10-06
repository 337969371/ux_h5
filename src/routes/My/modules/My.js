// ------------------------------------
// Constants
// ------------------------------------
import { postC, postCD } from "../../../utils/api";
import {addGlobalData} from "../../../store/global";
import {Toast} from "antd-mobile";

export const MEMBER_INFO = 'MEMBER_INFO'
export const QUESTION_GET = 'QUESTION_GET'


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getMemberInfo = () => {
    return (dispatch, getState) => {
        return  postC('customer/memberInfo', {})
            .then((response)=>{
                dispatch({
                    type    : MEMBER_INFO,
                    payload : {
                        info:response
                    }
                })
            }).catch((res)=>{
                if(res.code ===401){
                    dispatch(addGlobalData({showLogin:true}))
                }
            })
    }
}

export const getQuestionGet = () => {
    return (dispatch, getState) => {
        return  postCD('customer/active/question/get', dispatch,{})
            .then((response)=>{
                dispatch({
                    type    : QUESTION_GET,
                    payload : {
                        question:response
                    }
                })
            }).catch((res)=>{
                if(res.code ===401){
                    dispatch(addGlobalData({showLogin:true}))
                }
            })
    }
}

export const questionSubmit = (params) => {
    return (dispatch, getState) => {
        return  postCD('customer/active/question/submit', dispatch,params)
    }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MEMBER_INFO]: (state, action) => Object.assign({}, state, action.payload),
    [QUESTION_GET]: (state, action) => Object.assign({}, state, action.payload),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
