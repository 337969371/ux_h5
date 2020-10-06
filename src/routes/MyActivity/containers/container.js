import { connect } from 'react-redux'
import { getTopicList, clean } from '../modules/MyActivity'

import MyActivity from '../components/MyActivity'

const mapDispatchToProps = {
  getTopicList,
  clean
}

const mapStateToProps = (state) => ({
  myActivity : state.myActivity,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(MyActivity)
