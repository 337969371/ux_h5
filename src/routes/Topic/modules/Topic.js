// ------------------------------------
// Constants
// ------------------------------------
import {postF} from "../../../utils/api";
import {TAG_CLEAN} from "../../TagDetail/modules/tag";

export const TOPIC_LIST = 'TOPIC_LIST'
export const TOPIC_CLEAN = 'TOPIC_CLEAN'

export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: TOPIC_CLEAN,
        })
    }
}


export const getDataList = (params) => {
    return (dispatch, getState) => {
        return  postF('forum/topic/list',dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : TOPIC_LIST,
                    payload : response
                })
            })
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [TOPIC_CLEAN] :(state, action) =>Object.assign({}),
    [TOPIC_LIST]: (state, action) => {
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
