// ------------------------------------
// Constants
// ------------------------------------
import {postC} from "../../../utils/api";

export const MEMBER_INFO = 'MEMBER_INFO'


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getMemberInfo = () => {
  return (dispatch, getState) => {
    return  postC('customer/memberInfo', {})
        .then(function (response) {
          dispatch({
            type    : MEMBER_INFO,
            payload : response
          })
        })
  }
}

export const actions = {
  getMemberInfo
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEMBER_INFO]: (state, action) => Object.assign({}, state, action.payload),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
