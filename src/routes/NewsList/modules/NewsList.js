// ------------------------------------
// Constants
// ------------------------------------
import {postF,postShare} from "../../../utils/api";
import {Toast} from "antd-mobile";



export const NEWS_LIST = 'NEWS_LIST'
export const NEWS_CLEAN = 'POST_CLEAN'

export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: NEWS_CLEAN,
        })
    }
}



export const getList = (params) => {
    return (dispatch, getState) => {
        return postF('forum/article/list', dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : NEWS_LIST,
                    payload : response
                })
            })
    }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [NEWS_CLEAN] :(state, action) =>Object.assign({}),
    [NEWS_LIST]:(state, action) => {
        let array = [];
        let isFoot=false;
        if(state && state.records && state.records.length>0){
            array = state.records;
        }
        if(action.payload.records && action.payload.records.length>0){
            array = array.concat(action.payload.records);
            if(action.payload.records.length<3){
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
const initialState = {};
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
