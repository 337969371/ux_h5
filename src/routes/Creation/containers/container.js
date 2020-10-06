import { connect } from 'react-redux'


import Community from '../components/Creation'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  creation : state.creation,
  globalData:state.globalData
})



export default connect(mapStateToProps, mapDispatchToProps)(Community)
