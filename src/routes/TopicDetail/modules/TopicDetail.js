import {postF} from "../../../utils/api";


export const TOPIC_DETAIL = 'TOPIC_DETAIL'
export const TOPIC_DETAIL_POST = 'TOPIC_DETAIL_POST'
export const TOPIC_DETAIL_CLEAN = 'TOPIC_DETAIL_CLEAN'



export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: TOPIC_DETAIL_CLEAN,
        })
    }
}

export const getTopicDetail = (param) => {
    return (dispatch, getState) => {
        return  postF('forum/topic/detail',dispatch, param)
            .then(function (response) {
                dispatch({
                    type    : TOPIC_DETAIL,
                    payload : {
                        detail:response
                    }
                })
            })
    }
}

export const getTopicDetailPost = (param) => {
    return (dispatch, getState) => {
        return  postF('forum/post/list',dispatch, param)
            .then(function (response) {
                dispatch({
                    type    : TOPIC_DETAIL_POST,
                    payload : {
                        post:response
                    }
                })
            })
    }
}

export const isLikeTopic = (param) => {
    return (dispatch, getState) => {
        return  postF('forum/topic/like',dispatch, param)
    }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [TOPIC_DETAIL_CLEAN] :(state, action) =>Object.assign({}),
    [TOPIC_DETAIL]: (state, action) => Object.assign({}, state, action.payload),
    [TOPIC_DETAIL_POST]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.post && state.post.records && state.post.records.length>0){
            array = state.post.records;
        }
        if(action.payload.post.records && action.payload.post.records.length>0){
            array = array.concat(action.payload.post.records);
            if(action.payload.post.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.post.records = array;
        o.post.isFoot=isFoot;
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
