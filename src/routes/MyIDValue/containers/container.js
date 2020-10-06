import { connect } from 'react-redux'
import { getHistoryData, getPointRecord } from '../modules/MyIdValue'

import MyIdValue from '../components/MyIdValue'

const mapDispatchToProps = {
  getHistoryData,
  getPointRecord
}

const mapStateToProps = (state) => ({
  myIdValue : state.myIdValue,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(MyIdValue)
