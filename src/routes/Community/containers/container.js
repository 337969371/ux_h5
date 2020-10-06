import { connect } from 'react-redux'
import {getPostList, isLike, getTagList, getRecommendPostList,getTopicCategoryList,getSlideshowList,clean} from '../modules/Community'

import Community from '../components/Community'
import {isShowLoginModal} from "../../../store/global";


const mapDispatchToProps = {
  isShowLoginModal,
  getPostList,
  isLike,
  getTagList,
  getRecommendPostList,
  getTopicCategoryList,
  getSlideshowList,
  clean
}

const mapStateToProps = (state) => ({
  community:state.community,
  globalData:state.globalData,
})



export default connect(mapStateToProps, mapDispatchToProps)(Community)
