import React from 'react'
import { withRouter } from 'react-router'
import './Setting.scss'
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import {postC} from "../../utils/api";
import LogoutModal from "../../components/LogoutModal/LogoutModal";


class Setting extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      isLogin:false,
      showModal:false,
    }
  }
  componentDidMount() {
    let token  = localStorage.getItem("token");
    if(token){
      this.setState({
        isLogin:true
      })
    }
  }
  logout(){
    postC("login/logout",{}).then(res=>{
      localStorage.removeItem("token");
      window.location.href="/"
    })
  }
  closeModal(){
    this.setState({
      showModal:false
    })
  }
  render () {
    const { isLogin,showModal } = this.state;
    return (
        <div className='my'>
          <HeaderNav  transparent={true} isLight={true} {...this.props} />
          {showModal && <LogoutModal show={showModal}
                                     onClose={()=>this.closeModal()}
          />}
          <div className="my-info">
            <div className="my-info-header">
            </div>
            <div className="my-info-title">设置</div>
          </div>
          <div className="my-body my-info-body">
            <div className="my-body-content">
              <ul className="my-menu">
                <li onClick={()=>this.props.router.push({pathname:"/agreement"})}>
                  <div>
                    <span>隐私政策</span>
                  </div>
                </li>
                <li onClick={()=>this.props.router.push({pathname:"/faq"})}>
                  <div>
                    <span>常见问题</span>
                  </div>
                </li>
                <li onClick={()=>this.props.router.push({pathname:"/service"})}>
                  <div>
                    <span>在线客服</span>
                  </div>
                </li>
                {isLogin&&<li onClick={()=>this.setState({showModal:true})}>
                  <div>
                    <span>账号注销</span>
                  </div>
                </li>}
                <div className="logout-btn">
                  {isLogin?<a onClick={()=>this.logout()}>退出当前账号</a>:<div className="logout-btn-t">退出当前账号</div>}
                </div>
              </ul>

            </div>
          </div>
        </div>
    )
  }
}

export default withRouter(Setting)
