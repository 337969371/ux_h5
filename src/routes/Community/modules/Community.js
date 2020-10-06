// ------------------------------------
// Constants
// ------------------------------------
import {postF} from "../../../utils/api";
import {Toast} from "antd-mobile";

export const POST_LIST = 'POST_LIST'
export const POST_LIST_ISLIKE= 'POST_LIST_ISLIKE'
export const TAG_LIST= 'TAG_LIST'
export const SLIDESHOW_LIST='SLIDESHOW_LIST'
export const ARTICLE_LIST = 'ARTICLE_LIST'
export const TOPIC_CATEGORY_LIST = 'TOPIC_CATEGORY_LIST'
export const COMMUNITY_CLEAN = 'COMMUNITY_CLEAN'

export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: COMMUNITY_CLEAN,
        })
    }
}

export const getPostList = (params) => {
    return (dispatch, getState) => {
        return postF('forum/post/list',dispatch,params)
            .then(function (response) {
                dispatch({
                    type    : POST_LIST,
                    payload : {
                        post:response
                    }
                })
            })
    }
}

export const getRecommendPostList = (params) => {
    return (dispatch, getState) => {
        return postF('forum/article/list',dispatch,params)
            .then(function (response) {
                dispatch({
                    type    : ARTICLE_LIST,
                    payload : {
                        articleList:response
                    }
                })
            })
    }
}

export const getTopicCategoryList = (params) => {
    return (dispatch, getState) => {
        return postF('forum/topic/category/list',dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : TOPIC_CATEGORY_LIST,
                    payload : {
                        topicCategoryList:response
                    }
                })
            })
    }
}


export const getTagList = (params) => {
    return (dispatch, getState) => {
        return postF('forum/tag/list',dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : TAG_LIST,
                    payload : {
                        tag:response
                    }
                })
            })
    }
}

export const getSlideshowList = (params) => {
    return (dispatch, getState) => {
        return postF('forum/slideshow/list',dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : SLIDESHOW_LIST,
                    payload : {
                        slideshowList:response
                    }
                })
            })
    }
}

export const isLike = (params) => {
    return (dispatch, getState) => {
        postF('forum/post/like',dispatch, params)
            .then(function (response) {
                Toast.info("操作成功");
                dispatch({
                    type    : POST_LIST_ISLIKE,
                    payload : params.postId
                })
            })
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [COMMUNITY_CLEAN] :(state, action) =>Object.assign({}),
    [POST_LIST]    : (state, action) => {
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
    [TAG_LIST]    : (state, action) => Object.assign({}, state, action.payload),
    [SLIDESHOW_LIST]    : (state, action) => Object.assign({}, state, action.payload),
    [TOPIC_CATEGORY_LIST]    : (state, action) => Object.assign({}, state, action.payload),
    [ARTICLE_LIST]    : (state, action) =>{
        let array = [];
        let isFoot=false;
        if(state.articleList && state.articleList.records && state.articleList.records.length>0){
            array = state.articleList.records;
        }
        if(action.payload.articleList.records && action.payload.articleList.records.length>0){
            array = array.concat(action.payload.articleList.records);
            if(action.payload.articleList.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.articleList.records = array;
        o.articleList.isFoot=isFoot;
        return o
    },
    [POST_LIST_ISLIKE]:(state,action) =>{
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
const initialState = {

}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
