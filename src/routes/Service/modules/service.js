// ------------------------------------
// Constants
// ------------------------------------
import {postCD} from "../../../utils/api";


export const SERVICE_LIST = 'SERVICE_LIST'
export const SERVICE_CLEAN = 'SERVICE_CLEAN'

// ------------------------------------
// Actions
// ------------------------------------
export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: SERVICE_CLEAN,
        })
    }
}

export const getList = (params) => {
    return (dispatch, getState) => {
        return postCD('qa/list',dispatch, {})
            .then(function (response) {
                dispatch({
                    type    : SERVICE_LIST,
                    payload : response
                })
            })
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SERVICE_CLEAN] :(state, action) =>Object.assign({}),
    [SERVICE_LIST]    : (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.records && state.records.length>0){
            array = state.records;
        }
        if(action.payload.records && action.payload.records.length>0){
            array = array.concat(action.payload.records);
            if(action.payload.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.records = array;
        o.isFoot=isFoot;
        return o
    },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
