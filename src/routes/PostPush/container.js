import { connect } from 'react-redux'
import PostPush from './PostPush'
import {postPushData,showLogin,getMemberInfo} from "./modules";
import {isShowLoginModal} from "../../store/global";


const mapDispatchToProps = {
  postPushData,
  showLogin,
  isShowLoginModal,
  getMemberInfo
}

const mapStateToProps = (state) => ({
  globalData:state.globalData,
})



export default connect(mapStateToProps, mapDispatchToProps)(PostPush)
