import React from 'react'
import fireIcon from "../../static/icon/fire-black-icon.png";

import "./TagBlock.scss"
import PropTypes from "prop-types";

export default class TagBlock extends React.Component {
    constructor(props) {
        super(props)
    }
    getString(num){
        if(num<1000){
            return num.toString();
        }
        if(num>=1000 && num<1000000){
            return (num/1000).toFixed(1)+"K+";
        }

    }
    render() {
        const {title,num} =this.props;
        return (
            <div className="tags-item" onClick={()=>this.props.onClick()}>
                <div className="tags-item-name">
                    {title}
                </div>
                <div className="tags-item-content">
                    <div className="tags-item-icon">
                        <img src={fireIcon} alt=""/>
                    </div>
                    <div className="tags-item-num">
                        {this.getString(num)}
                    </div>
                </div>
            </div>
        );
    }
}
TagBlock.propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
}