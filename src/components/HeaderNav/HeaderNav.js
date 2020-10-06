import React from 'react'
import {Link, withRouter} from 'react-router'
import './HeaderNav.scss'
import backIcon from "../../static/icon/back-icon.png";
import backIconBlack from "../../static/icon/back-icon-black.png";


class HeaderNav extends React.Component {
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

    }
    render() {
        const { title, transparent, isLight, goBack } = this.props;
        return (
            <header className='nav-header'>
                <div className='nav-header-content' style={{background:transparent?'none':'#f0f0f0'}}>
                    <a onClick={()=>goBack?goBack():this.goBack()}>
                        <div className="left">
                            {isLight?<img src={backIcon} alt=""/>:<img src={backIconBlack} alt=""/>}
                        </div>
                    </a>
                    <div className="centre">
                        {title}
                    </div>
                    <div className="right">

                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(HeaderNav)
