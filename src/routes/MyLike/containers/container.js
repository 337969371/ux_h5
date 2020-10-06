import { connect } from 'react-redux'
import { getPostList, getArticleList, getTopicList, getRecommendList, clean } from '../modules/MyLike'

import MyLike from '../components/MyLike'

const mapDispatchToProps = {
  getPostList,
  getArticleList,
  getRecommendList,
  getTopicList,
  clean
}

const mapStateToProps = (state) => ({
  myLike : state.myLike,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(MyLike)
