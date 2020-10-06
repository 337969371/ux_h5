// ------------------------------------
// Constants
// ------------------------------------
import {postC, postCD, receivePrize} from "../../../utils/api";
import {addGlobalData} from "../../../store/global";
import {MEMBER_INFO} from "../../My/modules/My";


export const MY_PRIZE_ENTITY = 'MY_PRIZE_ENTITY'
export const MY_PRIZE_VIRTUAL = 'MY_PRIZE_VIRTUAL'
export const MY_PRIZE_WALLPAPER = 'MY_PRIZE_WALLPAPER'

export const MY_PRIZE_CLEAN = 'MY_PRIZE_CLEAN'
export const MY_GET_GIFT = 'MY_GET_GIFT'



export const clean = () => {
    return (dispatch, getState) => {
        dispatch({
            type: MY_PRIZE_CLEAN,
        })
    }
}

export const getMemberInfo = () => {
    return (dispatch, getState) => {
        return  postCD('customer/memberInfo', dispatch,{});
    }
}

export const getPrizeEntity = (params={}) => {
    return (dispatch, getState) => {
        return  postCD('prize/list', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_PRIZE_ENTITY,
                    payload : {
                        entity:response
                    }
                })
            })
    }
}


export const getPrizeVirtual = (params={}) => {
    return (dispatch, getState) => {
        return  postCD('prize/list', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_PRIZE_VIRTUAL,
                    payload : {
                        virtual:response
                    }
                })
            })
    }
}

export const getPrizeWallpaper = (params={}) => {
    return (dispatch, getState) => {
        return  postCD('prize/list', dispatch,params)
            .then((response)=>{
                dispatch({
                    type    : MY_PRIZE_WALLPAPER,
                    payload : {
                        wallpaper:response
                    }
                })
            })
    }
}

export const getGift = (params={}) => {
    return (dispatch, getState) => {
        return  receivePrize('prize/receivePrize', dispatch,params).then(res=>{
            if(res.code === 0){
                dispatch({
                    type    : MY_GET_GIFT,
                    payload : params.prizeId
                })
            }
            return res
        });
    }
}




// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MY_PRIZE_CLEAN] :(state, action) =>Object.assign({}),
    [MY_PRIZE_ENTITY]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.entity && state.entity.records && state.entity.records.length>0){
            array = state.entity.records;
        }
        if(action.payload.entity.records && action.payload.entity.records.length>0){
            array = array.concat(action.payload.entity.records);
            if(action.payload.entity.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.entity.records = array;
        o.entity.isFoot=isFoot;
        return o
    },
    [MY_PRIZE_VIRTUAL]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.virtual && state.virtual.records && state.virtual.records.length>0){
            array = state.virtual.records;
        }
        if(action.payload.virtual.records && action.payload.virtual.records.length>0){
            array = array.concat(action.payload.virtual.records);
            if(action.payload.virtual.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.virtual.records = array;
        o.virtual.isFoot=isFoot;
        return o
    },
    [MY_PRIZE_WALLPAPER]: (state, action) => {
        let array = [];
        let isFoot=false;
        if(state.wallpaper && state.wallpaper.records && state.wallpaper.records.length>0){
            array = state.wallpaper.records;
        }
        if(action.payload.wallpaper.records && action.payload.wallpaper.records.length>0){
            array = array.concat(action.payload.wallpaper.records);
            if(action.payload.wallpaper.records.length<10){
                isFoot=true;
            }
        }else {
            isFoot=true;
        }
        let o = Object.assign({}, state, action.payload);
        o.wallpaper.records = array;
        o.wallpaper.isFoot=isFoot;
        return o
    },
    [MY_GET_GIFT]: (state, action) => {
        if(state.entity && state.entity.records && state.entity.records.length>0){
            for (let item of state.entity.records){
                if(item.id === action.payload){
                    item.isPrized = "1";
                }
            }
        }
        return Object.assign({}, state)
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
