import React from 'react'
import PropTypes from 'prop-types'
import "../style/serviceDetail.scss"
import moment from "moment";
import Login from "../../../components/Login/Login";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";
import {ActivityIndicator, Toast} from "antd-mobile";



export default class ServiceDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            refreshing:false,
            answer:'',
            loading:false,
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData(){
        const { location } = this.props;
        let id = location.query.id;
        this.props.getDetail({"questionId": id}).then(res=>{
            this.setState({
                loading:false
            })
        })
    }
    push(){
        const { location } = this.props;
        let id = location.query.id;
        const {answer} =this.state;
        if(!answer){
            Toast.info("请输入问题");
            return;
        }
        this.setState({
            loading:true
        })
        this.props.push({
            content:answer,
            questionId:id
        }).then(res=>{
            this.setState({
                answer:'',
            })
            this.getData();
        }).catch(err=>{
            this.setState({
                loading:false
            })
        })
        stm_clicki('send', 'event', '按钮', '点击', "留言", "");
    }


    render() {
        const {serviceDetail} =this.props;
        return (
            <div className="serviceDetail">
                <Login {...this.props} />
                <HeaderNav title={"客服回复"} {...this.props}/>
                { this.state.loading && <ActivityIndicator toast />}
                <div className="main">
                    {
                        serviceDetail && serviceDetail.map((item,index)=>{
                            return (
                                <div className="conversation-item" key={index}>
                                    <div className={item.type==="10"?"conversation-item-right":"conversation-item-left"}>
                                        <div className="time">
                                            {moment(item.gmtCreate).format('YYYY-MM-DD HH:mm')}
                                        </div>
                                        <div className="content">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
                <div className="footer-answer">
                    <input value={this.state.answer} onChange={(e)=>this.setState({
                        answer:e.target.value
                    })}>

                    </input>
                    <button className="btn-blue send-btn" onClick={()=>this.push()}>
                        发送
                    </button>
                </div>

            </div>
        );
    }
}
ServiceDetail.propTypes = {
    serviceDetail:PropTypes.array.isRequired,
    getDetail:PropTypes.func.isRequired,
    push:PropTypes.func.isRequired,
}

