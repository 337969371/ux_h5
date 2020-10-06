import React from 'react'
import PropTypes from 'prop-types'
import "../style/MyIdValueHistory.scss"
import { withRouter} from "react-router";
import backIcon from "../../../static/icon/back-icon.png"
import moment from "moment";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";


class MyIdValueHistory extends React.Component {
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
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }
    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        let h= document.body.clientHeight - document.documentElement.clientHeight;
        const {  pageNum} = this.state;
        const { myIdValueHistory } = this.props;
        if( h === sT && sT>0 ){
            if(!myIdValueHistory.isFoot){
                this.setState({
                    pageNum:pageNum+1
                },()=>this.getData())
            }
        }
    }
    getData(){
        const {pageSize,pageNum} = this.state;
        this.props.getHistoryData({
            pageNum:pageNum,
            pageSize:pageSize,
        });
    }
    render() {
        const { myIdValueHistory } = this.props;
        console.log(myIdValueHistory);
        return (
            <div className="my">
                <HeaderNav transparent={true} isLight={true} {...this.props}/>
                <div className="my-info">
                    <div className="my-info-header">

                    </div>
                    <div className="my-info-title">ID.值记录</div>
                </div>

                <div className="my-id-body">
                    <div className="my-id-history-body">
                        {
                            myIdValueHistory && myIdValueHistory.records && myIdValueHistory.records.map((item,index)=>{
                                return (
                                    <div key={index} className="my-id-history-item">
                                        <div className="title">
                                            {item.pointDesc}
                                        </div>
                                        <div className="info">
                                            <div className="time">
                                                {moment(item.gmtCreate).format('YYYY-MM-DD HH:mm')}
                                            </div>
                                            <div>
                                                {item.pointType==="1"?<span className="add">+{item.points}</span>:""}
                                                {item.pointType==="2"?<span className="subtract">-{item.points}</span>:""}
                                            </div>
                                        </div>
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
export default withRouter(MyIdValueHistory)
MyIdValueHistory.propTypes = {
    myIdValueHistory:PropTypes.object.isRequired,
    getHistoryData:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired
}

