import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'tagAr',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/container').default
      const reducer = require('./modules/tagAr').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'tagArDetail', reducer })

      /*  Return getComponent   */
      cb(null, Counter)

    /* Webpack named bundle   */
    }, 'tagArDetail')
  }
})
