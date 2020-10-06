// ------------------------------------
// Constants
// ------------------------------------
import { postF } from "../../../utils/api";




export const MY_LIKE_ACTIVITY = 'MY_LIKE_ACTIVITY'
export const MY_LIKE_CLEAN = 'MY_LIKE_CLEAN'

export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: MY_LIKE_CLEAN,
        })
    }
}

export const getTopicList = (params={}) => {
    return (dispatch, getState) => {
        return  postF('forum/mylike/topicList', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_LIKE_ACTIVITY,
                    payload : response
                })
            })
    }
}

export const actions = {
    getTopicList,
    clean
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MY_LIKE_CLEAN] :(state, action) =>Object.assign({}),
    [MY_LIKE_ACTIVITY]: (state, action) => {
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
