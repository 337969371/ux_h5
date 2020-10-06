// ------------------------------------
// Constants
// ------------------------------------
import { postCD } from "../../../utils/api";
import {ARTICLE_LIST} from "../../Community/modules/Community";

export const MY_ID_VALUE_HISTORY_LIST = 'MY_ID_VALUE_HISTORY_LIST'

export const MY_ID_VALUE_HISTORY_CLEAN = 'MY_ID_VALUE_HISTORY_CLEAN'



export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: MY_ID_VALUE_HISTORY_CLEAN,
        })
    }
}

export const getHistoryData = (params={}) => {
    return (dispatch, getState) => {
        return  postCD('customer/point/list', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_ID_VALUE_HISTORY_LIST,
                    payload : response
                })
            })
    }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MY_ID_VALUE_HISTORY_CLEAN] :(state, action) =>Object.assign({}),
    [MY_ID_VALUE_HISTORY_LIST]    : (state, action) =>{
        let array = [];
        let isFoot=false;
        if(state && state.records && state.records.length>0){
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
