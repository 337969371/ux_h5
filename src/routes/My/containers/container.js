import { connect } from 'react-redux'
import { getMemberInfo,getQuestionGet,questionSubmit } from '../modules/My'
import {isShowLoginModal} from "../../../store/global";

import Community from '../components/My'

const mapDispatchToProps = {
  getMemberInfo,
  isShowLoginModal,
  getQuestionGet,
  questionSubmit
}

const mapStateToProps = (state) => ({
  member : state.member,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(Community)
