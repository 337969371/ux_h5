
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL'


export function addGlobalData(data) {
  return {
    type: SHOW_LOGIN_MODAL,
    data: data
  }
}


export function isShowLoginModal(data) {
  return (dispatch, getState) => {
    dispatch(addGlobalData({
      showLogin:data
    }))
  }
}



const ACTION_HANDLERS = {
  [SHOW_LOGIN_MODAL]: (state, action) => Object.assign({}, state, action.data),
}
const initialState = {
  showLogin:false,
}
export default  function globalDataReducer(state = initialState, action) {
  if(!action || !action.type){
    return state;
  }
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}