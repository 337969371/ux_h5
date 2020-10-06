import { connect } from 'react-redux'
import { getPrizeEntity, getPrizeVirtual, getPrizeWallpaper, getGift,  clean, getMemberInfo } from '../modules/MyChest'
import {isShowLoginModal} from "../../../store/global";
import MyChest from '../components/MyChest'

const mapDispatchToProps = {
  getPrizeEntity,
  getPrizeVirtual,
  getPrizeWallpaper,
  getGift,
  clean,
  getMemberInfo,
  isShowLoginModal
}

const mapStateToProps = (state) => ({
  myChest : state.myChest,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(MyChest)
