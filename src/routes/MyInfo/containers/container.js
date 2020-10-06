import { connect } from 'react-redux'
import { getMemberInfo } from '../modules/MyInfo'
import {isShowLoginModal, isShowAddInfoModal} from "../../../store/global";

import Community from '../components/MyInfo'

const mapDispatchToProps = {
  getMemberInfo,
}

const mapStateToProps = (state) => ({
  memberInfo : state.memberInfo,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(Community)
