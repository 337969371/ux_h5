import React from "react";
import {withRouter} from "react-router";


import shareIcon from "../../static/icon/yueduliang.png";
import commentIcon from "../../static/icon/pinglun.png";
import "./RecommendItem.scss";
import Utils from "../../utils/utils";


class RecommendItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {data} =this.props
        return (
            <div className="recommend-item" onClick={()=>this.props.router.push({
                pathname:"/article",
                query: {
                    id: data.id
                }
            })}>
                <div className="recommend-item-img">
                    {data.imageUrl &&
                    <img src={data.imageUrl} alt=""/>
                    }
                    {data.videoUrl &&
                    <video src={data.videoUrl} alt=""/>
                    }
                </div>
                <div className="recommend-item-content">
                    <div className="recommend-item-content-head">
                    </div>
                    <div className="recommend-item-content-main">
                        <div className="recommend-item-content-main-title">
                            {data.title}
                        </div>
                        <div className="recommend-item-content-main-user">
                            {data.nickname}
                        </div>
                        <div className="recommend-item-content-main-data">
                            <div className="recommend-item-content-main-data-left">
                                <div>
                                    <img src={shareIcon} alt=""/>{data.readCount}
                                </div>
                                <div>
                                    <img src={commentIcon} alt=""/>{data.commentCount}
                                </div>
                            </div>
                            <div className="recommend-item-content-main-data-right"
                                 style={{background: Utils.getUserBackground(data.valueLevel)}}>
                                <img src={data.profilePhoto} alt=""/>
                                {Utils.getUserLevelImg(data.valueLevel,"post-comment-left-img-icon")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RecommendItem)