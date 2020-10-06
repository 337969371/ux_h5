// ------------------------------------
// Constants
// ------------------------------------
import { postF } from "../../../utils/api";


export const MY_LIKE_POST = 'MY_LIKE_POST'
export const MY_LIKE_ARTICLE = 'MY_LIKE_ARTICLE'
export const MY_LIKE_TOPIC = 'MY_LIKE_TOPIC'
export const MY_LIKE_CLEAN = 'MY_LIKE_CLEAN'
export const MY_LIKE_RECOMMEND = 'MY_LIKE_RECOMMEND'


export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: MY_LIKE_CLEAN,
        })
    }
}

export const getPostList = (params={}) => {
    return (dispatch, getState) => {
        return  postF('forum/mylike/postList', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_LIKE_POST,
                    payload : {
                        post:response
                    }
                })
            })
    }
}

export const getArticleList = (params={}) => {
    return (dispatch, getState) => {
        return  postF('forum/mylike/articleList', dispatch,Object.assign({},params,{categoryCode:"ac_02"}))
            .then((response)=>{
                dispatch({
                    type    : MY_LIKE_ARTICLE,
                    payload : {
                        article:response
                    }
                })
            })
    }
}

export const getRecommendList = (params={}) => {
    return (dispatch, getState) => {
        return  postF('forum/mylike/articleList', dispatch,Object.assign({},params,{categoryCode:"ac_01"}))
            .then((response)=>{
                dispatch({
                    type    : MY_LIKE_RECOMMEND,
                    payload : {
                        recommend:response
                    }
                })
            })
    }
}


export const getTopicList = (params={}) => {
    return (dispatch, getState) => {
        return  postF('forum/mylike/topicList', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_LIKE_TOPIC,
                    payload : {
                        topic:response
                    }
                })
            })
    }
}

export const actions = {
    getPostList,
    getArticleList,
    getTopicList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MY_LIKE_CLEAN] :(state, action) =>Object.assign({}),
    [MY_LIKE_POST]: (state, action) => {
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
    [MY_LIKE_ARTICLE]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.article && state.article.records && state.article.records.length>0){
            array = state.article.records;
        }
        if(action.payload.article.records && action.payload.article.records.length>0){
            array = array.concat(action.payload.article.records);
            if(action.payload.article.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.article.records = array;
        o.article.isFoot=isFoot;
        return o
    },
    [MY_LIKE_RECOMMEND]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.recommend && state.recommend.records && state.recommend.records.length>0){
            array = state.recommend.records;
        }
        if(action.payload.recommend.records && action.payload.recommend.records.length>0){
            array = array.concat(action.payload.recommend.records);
            if(action.payload.recommend.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.recommend.records = array;
        o.recommend.isFoot=isFoot;
        return o
    },
    [MY_LIKE_TOPIC]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.topic && state.topic.records && state.topic.records.length>0){
            array = state.topic.records;
        }
        if(action.payload.topic.records && action.payload.topic.records.length>0){
            array = array.concat(action.payload.topic.records);
            if(action.payload.topic.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.topic.records = array;
        o.topic.isFoot=isFoot;
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
