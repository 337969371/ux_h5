import { connect } from 'react-redux'
import { getTopicDetail, getTopicDetailPost, isLikeTopic, clean } from '../modules/TopicDetail'
import {isShowLoginModal} from "../../../store/global";

import Community from '../components/TopicDetail'

const mapDispatchToProps = {
  getTopicDetail,
  getTopicDetailPost,
  isShowLoginModal,
  isLikeTopic,
  clean
}

const mapStateToProps = (state) => ({
  topicDetail : state.topicDetail,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(Community)
