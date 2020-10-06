import React from 'react'
import {Link, withRouter} from 'react-router'
import './WarmUp.scss'
import HeaderNav from "../../components/HeaderNav/HeaderNav";

import img2 from "../../static/warmUp/warm-up-2.jpg";
import img3 from "../../static/warmUp/warm-up-3.jpg";
import img4 from "../../static/warmUp/warm-up-4.jpg";
import {Modal} from "antd-mobile";


class WarmUp extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            data:'',
            showHelp:false,
        }
    }
    componentDidMount() {

    }
    render () {
        const {showHelp} =this.state;
        return (
            <div className='warm-up'>
                <HeaderNav transparent={true}  isLight={true}/>
                <Modal visible={showHelp} transparent onClose={()=>this.setState({showHelp:false})}>
                    <div className="warm-up-help-text">
                        <div className="title">
                            活动规则
                        </div>
                        <div className="item-title">
                            活动时间：
                        </div>
                        <div>
                            9月1日0点至9月21日24点
                        </div>
                        <div className="item-title">
                            活动规则：
                        </div>
                        <div className="desc">
                            1.选择你的兴趣领域，并上传一张与之相关的代表性照片，生成专属你的“ID.玩家秀”海报；
                        </div>
                        <div className="desc">
                            2.注册玩家通过分享海报到“ID.圈子”，写出你的ID.宣言/感悟，即可收获100 ID.值奖励；
                        </div>
                        <div className="desc">
                            3.最终分享的海报获赞排名前十位的玩家将获得300 ID.值奖励，同时更有机会获得“月度玩家”称号。活动结束后，「ID.助手」将在社区公布获奖结果。
                        </div>
                        <div className="hint">
                            注：本活动最终解释权归大众汽车（中国）投资有限公司所有
                        </div>
                    </div>
                </Modal>
                <div className="warm-up-item">
                    <img src="https://id-oss.vw.com.cn/img/warm-up-1.jpg" alt=""/>
                    <Link to="/showPhoto" className="link btn1" onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "马上参与", "")}>马上参与</Link>
                    <a className="link btn2" onClick={()=>{
                        this.setState({showHelp:true});
                        stm_clicki('send', 'event', '说明文档', '点击', "了解更多", "")
                    }}>了解更多</a>
                </div>
                <div className="warm-up-item">
                    <img src={img2} alt=""/>
                    <Link to="/showPhoto" className="link btn3" onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "马上参与", "")}>马上参与</Link>
                </div>
                <div className="warm-up-item">
                    <img src={img3} alt=""/>
                    <Link to="/showPhoto" className="link btn4" onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "马上参与", "")}>马上参与</Link>
                </div>
                <div className="warm-up-item">
                    <img src={img4} alt=""/>
                    <Link to="/showPhoto" className="link btn5" onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "马上参与", "")}>马上参与</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(WarmUp)