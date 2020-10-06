import React from 'react'
import PropTypes from 'prop-types'
import "../style/MyIdValue.scss"
import { withRouter} from "react-router";

import echarts from 'echarts/lib/echarts';// 引入柱状图

import 'echarts/lib/chart/bar';// 引入提示框和标题组件

import 'echarts/lib/component/tooltip';

import 'echarts/lib/component/title';
import HeaderNav from "../../../components/HeaderNav/HeaderNav";
import helpIcon from "../../../static/icon/help-icon.png";
import {Modal} from "antd-mobile";


class MyIdValue extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.getHistoryData({});
        this.state={
            showHelp:false,
        }
    }
    componentDidMount() {
        this.props.getPointRecord({}).then(res=>{
            const { myIdValue } = this.props;
            if(myIdValue.record && myIdValue.record.length>0){
                let title = [], value = [];
                for (let item of myIdValue.record){
                    title.push(item.date);
                    value.push(item.points);
                }
                let myChart = echarts.init(document.getElementById('my-id-history')); // 绘制图表
                myChart.setOption({
                    tooltip: {},
                    xAxis: { data: title },
                    yAxis: {},
                    series: [{
                        type: 'bar',
                        itemStyle: {
                            color: '#7cb5ec',
                            barBorderRadius: [5, 5, 0, 0]
                        },
                        data: value
                    }]

                });
            }
        });
    }
    go(type){
        if(type === "home"){
            this.props.router.replace('/');
        }else if(type === "brand"){
            this.props.router.replace('/brand');
        } else if(type === "campaign"){
            this.props.router.replace('/campaign');
        } else if(type === "lifestyle"){
            this.props.router.replace('/lifestyle');

        } else if(type === "me"){
            this.props.router.replace('/me');
        }
    }
    render() {
        const { myIdValue } = this.props;
        const { showHelp } = this.state;
        return (
            <div className="my-id-value">
                <HeaderNav transparent={true} isLight={true} {...this.props}/>
                <Modal visible={showHelp} transparent onClose={()=>this.setState({showHelp:false})}>
                    <div className="id-value-help-text">
                        <div className="title">
                            1、什么是ID.值
                        </div>
                        <div className="desc">
                            ID.值是根据玩家在“连线ID.”社区内的互动行为给予的虚拟成长值奖励，每位玩家均有机会获得。连线ID.平台拥有完整的玩家成长体系，帮助每一位玩家在这里找到归属感。<br/>
                            ID.值仅对自己可见，玩家进入“连线ID.”社区，点击“我的ID.值”即可查看ID.值详情。
                        </div>
                        <div className="title">
                            2、如何提升ID.值
                        </div>
                        <div className="desc">
                            玩家在“连线ID.”社区完善个人信息、参与社区活动、发表文章话题、为社区出谋划策等，均可以获得ID.值奖励。<br/>
                            *发现任务，去攒ID.值
                        </div>
                        <div className="title">
                            3、ID.值的用途
                        </div>
                        <div className="desc">
                            ID.值与玩家的社区权益挂钩，玩家社区权益包括礼品权益、活动参与权益等。随着ID.值的上升，玩家可享受更多特权。
                        </div>
                        <div className="title">
                            4、ID.值有效期
                        </div>
                        <div className="desc">
                            ID.值有效期为1年（365天），玩家在有效期到期日的次日ID.值会自动清零。
                        </div>
                    </div>
                </Modal>
                <div className="my-info">
                    <div className="my-info-header">
                    </div>
                    <div className="my-info-title">ID.值</div>
                    <div className="help-text-icon">
                        <img src={helpIcon} alt="" onClick={()=>this.setState({showHelp:true})}/>
                    </div>
                </div>

                <div className="my-id-body">
                    <div className="my-id-content">
                        <div className="my-id-content-title">
                            <div>
                                <span>我的ID.</span>值记录
                            </div>

                            <div>
                                <button onClick={()=>this.props.router.push("/myIDValueHistory")}>详情</button>
                            </div>
                        </div>

                        <div className="my-id-history">
                            <div id="my-id-history" style={{ width: '100%', height: 315 }}></div>
                        </div>
                        {
                            myIdValue.history && myIdValue.history.length>0 && myIdValue.history.map((item,index)=>{
                                return (
                                    <div className="my-id-item" key={index}>
                                        <ul>
                                            <li>
                                                <div className="title">
                                                    {item.title}
                                                </div>
                                            </li>
                                            {
                                                item && item.list && item.list.map((j,i)=>{
                                                    return(
                                                        <li key={index+i}>
                                                            <div>
                                                                {j.actionName}
                                                            </div>
                                                            <div>
                                                                <span className="add">+{j.points}</span>
                                                                {
                                                                    j.finishStatus === "1" && j.businessCode && <button className="finish">完成</button>
                                                                }
                                                                {
                                                                    j.finishStatus === "0" && j.businessCode && <button onClick={()=>this.go(j.businessCode)} className="go">前往</button>
                                                                }
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(MyIdValue)
MyIdValue.propTypes = {
    myIdValue:PropTypes.object.isRequired,
    getHistoryData:PropTypes.func.isRequired
}

