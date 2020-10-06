// ------------------------------------
// Constants
// ------------------------------------
import {postF} from "../../../utils/api";
import {Toast} from "antd-mobile";
import {COMMUNITY_CLEAN, POST_LIST, POST_LIST_ISLIKE} from "../../Community/modules/Community";


export const TAG_DETAIL = 'TAG_DETAIL'
export const TAG_POST_LIST = 'TAG_POST_LIST'
export const TAG_POST_LIKE = 'TAG_POST_LIKE'
export const TAG_CLEAN = 'TAG_CLEAN'

// ------------------------------------
// Actions
// ------------------------------------
export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: TAG_CLEAN,
        })
    }
}

export const getDetail = (params) => {
    return (dispatch, getState) => {
        return postF('forum/tag/detail',dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : TAG_DETAIL,
                    payload : {
                        detail:response
                    }
                })
            })
    }
}

export const getPostList = (params) => {
    return (dispatch, getState) => {
        return postF('forum/post/list',dispatch, params)
            .then((response)=>{
                dispatch({
                    type    : TAG_POST_LIST,
                    payload : {
                        clean:params.clean?true:false,
                        post:response
                    }
                })
            })
    }
}

export const isLike = (params) => {
    return (dispatch, getState) => {
     return  postF('forum/post/like',dispatch, params)
            .then((response)=>{
                Toast.info("操作成功");
                dispatch({
                    type    : TAG_POST_LIKE,
                    payload : params.postId
                })
            })
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [TAG_CLEAN] :(state, action) =>Object.assign({}),
    [TAG_DETAIL]    : (state, action) => Object.assign({}, state, action.payload),
    [TAG_POST_LIST]:(state, action) => {
        let isFoot=false;
        //tab切换时清除
        if(action.payload && action.payload.clean){
            if(action.payload.post.records && action.payload.post.records.length<10){
                action.payload.post.isFoot=true;
            }
            return Object.assign({}, state, action.payload);
        }
        let array = [];
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
    [TAG_POST_LIKE]:(state, action)=>{
        for (let item of state.post.records){
            if(item.id === action.payload && item.isLiked === 0){
                item.isLiked=1;
                item.likeCount = item.likeCount+1;
            }
        }
        return Object.assign({}, state);
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
