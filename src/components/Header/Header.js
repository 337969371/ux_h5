import React from 'react'
import {Link, withRouter} from 'react-router'
import './Header.scss'

import logo from '../../static/icon/logo-icon.png'
import logo_h from '../../static/icon/w-logo.png'
import search from '../../static/icon/search.png'
import logoBlack from '../../static/icon/logo-black.png'
import closeIcon from "../../static/icon/icon-close.svg"
import closeIconBlack from "../../static/icon/icon-close-black.svg"


class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    goBack(){
        try {
            if(window.history.length>3){
                this.props.router.goBack();
            }else {
                window.location.href="/";
            }
        }catch (e) {
            try {
                window.history.back(-1);
            }catch (e) {
                window.location.href="/";
            }
        }
        stm_clicki('send', 'event', '返回按钮', '点击', "返回", "");
    }
    render() {
        const { close, home, isBlack, onClose } = this.props;
        return (
            <header className='homeHeader'>
                <div className='headerContent'>
                    <div className="leftLogo">
                        <img src={isBlack?logoBlack:logo} alt={logo}/>
                    </div>
                    {
                        close? <div className='rightButton'>
                                <a onClick={()=>onClose?onClose():this.goBack()}><img src={isBlack?closeIconBlack:closeIcon} alt="返回"/></a>
                            </div>:
                            <div className='rightButton'>
                                <Link to="/search"><img src={search} alt="搜索"/></Link>
                            </div>
                    }
                </div>
                {home && <div className='headerBottom'>
                    <div></div>
                    <img src={logo_h} alt="logo" />
                    <div></div>
                </div>}
            </header>
        )
    }
}

export default withRouter(Header)
