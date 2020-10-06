// ------------------------------------
// Constants
// ------------------------------------
import {postF,postShare} from "../../../utils/api";
import {Toast} from "antd-mobile";


export const ARTICLE_DETAIL = 'ARTICLE_DETAIL'
export const ARTICLE_DETAIL_COMMENT = 'ARTICLE_DETAIL_COMMENT'
export const ARTICLE_DETAIL_COMMENT_LIKE = 'ARTICLE_DETAIL_COMMENT_LIKE'
export const ARTICLE_CLEAN = 'ARTICLE_CLEAN'

export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: ARTICLE_CLEAN,
        })
    }
}



export const getDetail = (params) => {
    return (dispatch, getState) => {
        return postF('forum/article/detail', dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : ARTICLE_DETAIL,
                    payload : {
                        detail:response
                    }
                })
            })
    }
}

export const forward = (params) => {
    return (dispatch, getState) => {
        return postShare('forum/article/forward', dispatch, params)
    }
}

export const isLike = (params) => {
    return (dispatch, getState) => {
        return postF('forum/article/like', dispatch, params)
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
                    type    : ARTICLE_DETAIL_COMMENT_LIKE,
                    payload : params.commentId
                })
            })
    }

}

export const getComment = (params) => {
    return (dispatch, getState) => {
        return postF('forum/article/comment/list',dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : ARTICLE_DETAIL_COMMENT,
                    payload : {
                        comment:response
                    }
                })
            })
    }
}

export const comment = (params) => {
    return (dispatch, getState) => {
        return postF('forum/article/comment',dispatch, params)
            .then(function (response) {
                Toast.info("评论成功");
            })
    }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ARTICLE_CLEAN] :(state, action) =>Object.assign({}),
    [ARTICLE_DETAIL]    : (state, action) => Object.assign({}, state, action.payload),
    [ARTICLE_DETAIL_COMMENT]:(state, action) => {
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
    [ARTICLE_DETAIL_COMMENT_LIKE]:(state, action)=>{
        for (let item of state.comment.records){
            if(item.commentId === action.payload && item.isLiked === 0){
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
