import React from "react";
import "./Footer.scss"

export default class Footer extends React.Component{

    render() {
        return (
            <div className="base-footer">
                <div className="base-footer-menu">
                    <div className="base-footer-menu-item">
                        <a href="https://www.vw.com.cn/" target="_blank">大众汽车中国</a>
                    </div>
                    <div className="base-footer-menu-item">
                        <a href="http://www.vwimport.cn/" target="_blank">大众进口汽车</a>
                    </div>
                    <div className="base-footer-menu-item">
                        <a href="http://vw.faw-vw.com/" target="_blank">一汽-大众</a>
                    </div>
                    <div className="base-footer-menu-item">
                        <a href="https://www.svw-volkswagen.com/zh.html" target="_blank">上汽大众</a>
                    </div>
                    <div className="base-footer-menu-item">
                        <a href="https://www.volkswagen.de/de.html" target="_blank">Volkswagen AG</a>
                    </div>
                </div>
                <div className="base-footer-in-tray">
                    <div>
                        <a href="http://beian.miit.gov.cn/" target="_blank">京ICP备08103718号-17</a>
                    </div>
                    <div>
                        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502040207" target="_blank">京公安备11010502040207号</a>
                    </div>
                </div>
            </div>
        );
    }

}