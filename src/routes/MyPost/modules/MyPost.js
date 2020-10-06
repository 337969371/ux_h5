// ------------------------------------
// Constants
// ------------------------------------
import { postF } from "../../../utils/api";


export const MY_POST_PASS = 'MY_POST_PASS'
export const MY_POST_PENDING = 'MY_POST_PENDING'
export const MY_LIKE_CLEAN = 'MY_LIKE_CLEAN'

export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: MY_LIKE_CLEAN,
        })
    }
}

//已发布
export const getPostPass = (params={}) => {
    return (dispatch, getState) => {
        return  postF('forum/mypost/postList', dispatch, Object.assign({},params,{type:"10"}))
            .then((response)=>{
                dispatch({
                    type    : MY_POST_PASS,
                    payload : {
                        postPass:response
                    }
                })
            })
    }
}


//待审核
export const getPostPending = (params={}) => {
    return (dispatch, getState) => {
        return  postF('forum/mypost/postList', dispatch, Object.assign({},params,{type:"00"}))
            .then((response)=>{
                dispatch({
                    type    : MY_POST_PENDING,
                    payload : {
                        postPending:response
                    }
                })
            })
    }
}


export const actions = {
    getPostPending,
    getPostPass,
    clean
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MY_LIKE_CLEAN] :(state, action) =>Object.assign({}),
    [MY_POST_PASS]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.postPass && state.postPass.records && state.postPass.records.length>0){
            array = state.postPass.records;
        }
        if(action.payload.postPass.records && action.payload.postPass.records.length>0){
            array = array.concat(action.payload.postPass.records);
            if(action.payload.postPass.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.postPass.records = array;
        o.postPass.isFoot=isFoot;
        return o
    },
    [MY_POST_PENDING]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.postPending && state.postPending.records && state.postPending.records.length>0){
            array = state.postPending.records;
        }
        if(action.payload.postPending.records && action.payload.postPending.records.length>0){
            array = array.concat(action.payload.postPending.records);
            if(action.payload.postPending.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.postPending.records = array;
        o.postPending.isFoot=isFoot;
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
