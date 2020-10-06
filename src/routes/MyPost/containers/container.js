import { connect } from 'react-redux'
import { getPostPending, getPostPass, clean } from '../modules/MyPost'

import Community from '../components/MyPost'

const mapDispatchToProps = {
  getPostPending,
  getPostPass,
  clean
}

const mapStateToProps = (state) => ({
  myPost : state.myPost,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(Community)
