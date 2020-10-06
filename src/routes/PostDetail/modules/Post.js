// ------------------------------------
// Constants
// ------------------------------------
import {postF,postShare} from "../../../utils/api";
import {Toast} from "antd-mobile";


export const POST_DETAIL = 'POST_DETAIL'
export const POST_DETAIL_COMMENT = 'POST_DETAIL_COMMENT'
export const POST_DETAIL_COMMENT_LIKE = 'POST_DETAIL_COMMENT_LIKE'
export const POST_CLEAN = 'POST_CLEAN'

export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: POST_CLEAN,
        })
    }
}



export const getDetail = (params) => {
    return (dispatch, getState) => {
        return postF('forum/post/detail', dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : POST_DETAIL,
                    payload : {
                        detail:response
                    }
                })
            })
    }
}

export const forward = (params) => {
    return (dispatch, getState) => {
        return postShare('forum/post/forward', dispatch, params)
    }
}

export const isLike = (params) => {
    return (dispatch, getState) => {
        return postF('forum/post/like', dispatch, params)
            .then(function (response) {
                Toast.info("收藏成功");
            })
    }
}

export const commentIsLike = (params) => {
    return (dispatch, getState) => {
        return postF('forum/comment/like',dispatch, params)
            .then(function (response) {
                Toast.info("点赞成功");
                dispatch({
                    type    : POST_DETAIL_COMMENT_LIKE,
                    payload : params.commentId
                })
            })
    }

}

export const getComment = (params) => {
    return (dispatch, getState) => {
        return postF('forum/post/comment/list',dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : POST_DETAIL_COMMENT,
                    payload : {
                        comment:response
                    }
                })
            })
    }
}

export const postComment = (params) => {
    return (dispatch, getState) => {
        return postF('forum/post/comment',dispatch, params)
            .then(function (response) {
                Toast.info("评论成功");
            })
    }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [POST_CLEAN] :(state, action) =>Object.assign({}),
    [POST_DETAIL]    : (state, action) => Object.assign({}, state, action.payload),
    [POST_DETAIL_COMMENT]:(state, action) => {
        let array = [];
        let isFoot=false;
        if(state.comment && state.comment.records && state.comment.records.length>0){
            array = state.comment.records;
        }
        if(action.payload.comment.records && action.payload.comment.records.length>0){
            array = array.concat(action.payload.comment.records);
            if(action.payload.comment.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.comment.records = array;
        o.comment.isFoot=isFoot;
        return o
    },
    [POST_DETAIL_COMMENT_LIKE]:(state, action)=>{
        for (let item of state.comment.records){
            if(item.commentId === action.payload && item.isLiked === 0){
                item.isLiked=1;
                item.likeCount = item.likeCount+1;
            }
            if(item.childList){
                for (let i of item.childList){
                    if(i.commentId === action.payload && i.isLiked === 0){
                        i.isLiked=1;
                        i.likeCount = i.likeCount+1;
                    }
                }
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
