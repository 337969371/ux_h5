import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export default class PageLayout extends React.Component{
    render() {
        const {children} = this.props
        return (
            <div className="page-layout__viewport">
                {children}
            </div>
        );
    }
}
PageLayout.propTypes = {
    children: PropTypes.node,
}


