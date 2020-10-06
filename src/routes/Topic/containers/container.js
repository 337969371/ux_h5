import { connect } from 'react-redux'
import { getDataList,clean } from '../modules/Topic'

import Community from '../components/Topic'

const mapDispatchToProps = {
  getDataList,
  clean,
}

const mapStateToProps = (state) => ({
  topic : state.topic,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(Community)
