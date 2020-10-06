import { connect } from 'react-redux'
import Kol from './Kol'
import {getGift} from "./modules";
import {isShowLoginModal} from "../../store/global";


const mapDispatchToProps = {
  getGift,
  isShowLoginModal,
}

const mapStateToProps = (state) => ({
  globalData:state.globalData,
})



export default connect(mapStateToProps, mapDispatchToProps)(Kol)
