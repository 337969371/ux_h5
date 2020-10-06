import React from "react";
import {withRouter} from "react-router";
import "./Menu.scss"


import iconHome from "../../static/icon/home/icon-home.png";
import iconHomeGray from "../../static/icon/home/icon-home-gray.png";
import iconCar from "../../static/icon/home/icon-car.png";
import iconCarGray from "../../static/icon/home/icon-car-gray.png";
import iconCreation from "../../static/icon/home/icon-creation.png";
import iconCreationGray from "../../static/icon/home/icon-creation-gray.png";
import iconPlay from "../../static/icon/home/icon-play.png";
import iconPlayGray from "../../static/icon/home/icon-play-gray.png";
import iconContact from "../../static/icon/home/icon-contact.png";
import iconContactGray from "../../static/icon/home/icon-contact-gray.png";

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    go(url){
        if(url === "/"){
            stm_clicki('send', 'event', '跳转ID. 连线', '点击', '底部导航菜单', "ID. 连线");
        }else if(url === "/brand"){
            stm_clicki('send', 'event', '跳转ID. 世界', '点击', '底部导航菜单', "ID. 世界");
        } else if(url === "/techcampaign"){
            stm_clicki('send', 'event', '跳转ID. 造物', '点击', '底部导航菜单', "ID. 造物");
        } else if(url === "/lifestyle"){
            stm_clicki('send', 'event', '跳转ID. 玩场', '点击', '底部导航菜单', "ID. 玩场");
        } else if(url === "/me"){
            stm_clicki('send', 'event', '跳转ID. ME', '点击', '底部导航菜单', "ID. ME");
        }
        this.props.router.push(url);
    }
    render() {
        const { unfold,location } = this.props;
        return (
            <div className={['menu','animate__animated', unfold?'animate__slideInUp':'animate__slideOutDown'].join(" ")}>
                <ul>
                    <li onClick={()=>this.go("/")}>
                        <img src={location.pathname==="/"?iconHomeGray:iconHome} alt='连线ID. ' />
                        <span>连线ID. </span>
                    </li>
                    <li onClick={()=>this.go("/brand")}>
                        <img src={location.pathname==="/brand"?iconCarGray:iconCar} alt='ID. 世界' />
                        <span>ID. 世界</span>
                    </li>
                    <li  onClick={()=>this.go("/techcampaign")}>
                        <img src={location.pathname==="/techcampaign"?iconCreationGray:iconCreation} alt='ID. 造物' />
                        <span>ID. 造物</span>
                    </li>
                    <li onClick={()=>this.go("/lifestyle")}>
                        <img src={location.pathname==="/lifestyle"?iconPlayGray:iconPlay} alt='ID. 玩场' />
                        <span>ID. 玩场</span>
                    </li>
                    <li onClick={()=>this.go("/me")}>
                        <img src={location.pathname==="/me"?iconContactGray:iconContact} alt='ID. ME' />
                        <span>ID. ME</span>
                    </li>
                </ul>
            </div>
        )
    }
}
export default withRouter(Menu)

