// ------------------------------------
// Constants
// ------------------------------------
import { postCD } from "../../../utils/api";

export const MY_ID_VALUE_HISTORY = 'MY_ID_VALUE'

export const MY_ID_VALUE_RECORD = 'MY_ID_VALUE_RECORD'


export const getHistoryData = (params={}) => {
    return (dispatch, getState) => {
        return  postCD('customer/point/action/list', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_ID_VALUE_HISTORY,
                    payload : {
                        history:response
                    }
                })
            })
    }
}


export const getPointRecord = (params={}) => {
    return (dispatch, getState) => {
        return  postCD('customer/point/record', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_ID_VALUE_RECORD,
                    payload : {
                        record:response
                    }
                })
            })
    }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MY_ID_VALUE_HISTORY] :(state, action) =>Object.assign({},state,action.payload),
    [MY_ID_VALUE_RECORD] :(state, action) =>Object.assign({},state,action.payload),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
