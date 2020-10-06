// ------------------------------------
// Constants
// ------------------------------------
import {postCD} from "../../../utils/api";


export const SERVICE_PUSH = 'SERVICE_PUSH'


export const push = (params) => {
    return (dispatch, getState) => {
        return postCD('qa/add',dispatch, params)

    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SERVICE_PUSH] :(state, action) =>Object.assign({}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
