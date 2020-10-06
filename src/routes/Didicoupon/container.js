import { connect } from 'react-redux'
import Didicoupon from './Didicoupon'
import {participation} from "./modules";
import {isShowLoginModal} from "../../store/global";


const mapDispatchToProps = {
  participation,
  isShowLoginModal,
}

const mapStateToProps = (state) => ({
  globalData:state.globalData,
})



export default connect(mapStateToProps, mapDispatchToProps)(Didicoupon)
