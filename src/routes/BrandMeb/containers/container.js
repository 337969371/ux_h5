import { connect } from 'react-redux'


import Community from '../components/BrandMeb'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  world : state.world,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(Community)
