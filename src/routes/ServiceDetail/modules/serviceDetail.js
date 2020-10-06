// ------------------------------------
// Constants
// ------------------------------------
import {postCD} from "../../../utils/api";


export const SERVICE_DETAIL = 'SERVICE_DETAIL'

// ------------------------------------
// Actions
// ------------------------------------

export const getDetail = (params) => {
    return (dispatch, getState) => {
        return postCD('qa/answer/list',dispatch, params)
            .then(function (response) {
                dispatch({
                    type    : SERVICE_DETAIL,
                    payload : response
                })
            })
    }
}

export const push = (params) => {
    return (dispatch, getState) => {
        return postCD('qa/ask',dispatch, params)
    }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SERVICE_DETAIL]    : (state, action) => Object.assign([], state, action.payload),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
