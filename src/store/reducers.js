import { combineReducers } from 'redux'
import locationReducer from './location'
import globalDataReducer from './global'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    globalData:globalDataReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
