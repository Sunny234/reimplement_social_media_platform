import React from 'react'
import {Link} from 'react-router-dom';

const SidebarButton = ({text, URL}) => {

    const renderThis = () => {

        if(URL === window.location.pathname) {
            return (
                <Link to={URL} className="sidebar-button-selected">{text}</Link>
            );
        } else {
            return (
                <Link to={URL} className="sidebar-button-text">{text}</Link>
            );
        }
    }

    return renderThis();
};

export default SidebarButton;