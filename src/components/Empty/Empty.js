import React from "react";
import icon from "../../static/icon/empty-icon.png"
import "./Empty.scss"

export default class Empty extends React.Component{
    render() {
        const {text} =this.props;
        return (
            <div className="my-empty">
                <img src={icon} alt=""/>
                <div className="my-empty-hint">
                    {text || "暂无数据"}
                </div>
            </div>
        );
    }
}