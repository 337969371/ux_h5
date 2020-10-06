import React from 'react'
import "./WaterFallBlock.scss"
import PropTypes from "prop-types";
import collectionIcon from "../../static/icon/collection-icon-gray.png";
import isCollectionIcon from "../../static/icon/collection-icon-red.png";
import Utils from "../../utils/utils";

export default class WaterFallBlock extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {tag,img,title,head,name,isCollection=false,collectionNum,id,valueLevel} =this.props;
        return (
            <div className="pin">
                <div onClick={()=>this.props.router.push({
                    pathname:"/post",
                    query: {
                        id: id
                    }
                })}>
                    <span className="tag">{tag}</span>
                    {img&&<img src={JSON.parse(img)[0]}/>}
                    <div className="pin-main">
                        <p>{title}</p>
                    </div>
                </div>

                <div className="pin-info">
                    <div className="pin-info-left">
                        <div className="pin-info-head" style={{background:Utils.getUserBackground(valueLevel)}}>
                            <img src={head} alt=""/>
                            {Utils.getUserLevelImg(valueLevel,"post-comment-left-img-icon")}
                        </div>
                        <span>{name}</span>
                    </div>
                    <div  className="pin-info-right">
                        <a onClick={()=>this.props.isLike({
                            postId:id
                        })}>
                            <img src={isCollection?isCollectionIcon:collectionIcon} alt="收藏"/>
                        </a>

                        <span>{collectionNum}</span>
                    </div>
                </div>
            </div>
        );
    }
}

WaterFallBlock.propTypes = {
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    head:PropTypes.string.isRequired,
    img:PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isCollection:PropTypes.bool.isRequired,
    collectionNum:PropTypes.number.isRequired,
}