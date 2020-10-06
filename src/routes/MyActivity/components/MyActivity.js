import React from 'react'
import PropTypes from 'prop-types'
import "../style/MyActivity.scss"
import {Link, withRouter} from "react-router";
import moment from "moment"
import HeaderNav from "../../../components/HeaderNav/HeaderNav";
import Empty from "../../../components/Empty/Empty";

class MyActivity extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.state= {
            pageSize: 10,
            pageNum:1,
        }
    }
    componentDidMount() {
        this.getData();
        window.addEventListener('scroll', this.scrollChange)
    }
    getData(){
        const {pageSize,pageNum} = this.state;
        this.props.getTopicList({
            pageNum:pageNum,
            pageSize:pageSize,
        });
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }
    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        let h= document.body.clientHeight - document.documentElement.clientHeight;
        const {  pageNum} = this.state;
        const { myActivity } = this.props;
        if( h === sT && sT>0 ){
            if(!myActivity.isFoot){
                this.setState({
                    pageNum:pageNum+1
                },()=>this.getData())
            }
        }
    }

    render() {
        const { myActivity } = this.props;
        return (
            <div className="my">
                <HeaderNav transparent={true} isLight={true} {...this.props}/>
                <div className="my-info">
                    <div className="my-info-header">
                    </div>
                    <div className="my-info-title">我的活动</div>
                </div>
                <div className="my-like-body">
                    <div className="my-body-content">
                        <div>
                            {
                                myActivity && myActivity.records &&
                                myActivity.records.length>0
                                && myActivity.records.map((item,index)=><div className="my-like-item" key={index} onClick={()=>this.props.router.push({
                                    pathname:"/topicDetail",
                                    query: {
                                        id:item.id,
                                        tagCode:item.tagCode,
                                        type:item.type
                                    }
                                })}>
                                    <div className="left">
                                        <img src={item.imageUrl} alt=""/>
                                    </div>
                                    <div className="right">
                                        <h4>
                                            {item.title}
                                        </h4>
                                        <div className="my-like-item-info">
                                            <div>
                                                {item.nickname}
                                            </div>
                                            <div className="time">
                                                {moment(item.gmtCreate).format('YYYY-MM-DD HH:mm')}
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                            { myActivity && myActivity.records && myActivity.records.length===0 &&  <Link to="/lifestyle#activity"><Empty text="空空如也，去看看活动吧" /></Link>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(MyActivity)
MyActivity.propTypes = {
    myActivity:PropTypes.object.isRequired,
    getTopicList:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired,
}

