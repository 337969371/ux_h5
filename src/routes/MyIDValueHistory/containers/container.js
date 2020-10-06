import { connect } from 'react-redux'
import { getHistoryData, clean } from '../modules/MyIdValueHistory'

import MyIdValueHistory from '../components/MyIdValueHistory'

const mapDispatchToProps = {
  getHistoryData,
  clean
}

const mapStateToProps = (state) => ({
  myIdValueHistory : state.myIdValueHistory,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(MyIdValueHistory)
