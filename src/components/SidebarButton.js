import React from 'react';
import {Link} from 'react-router-dom';

const SidebarButton = ({text, URL}) => {
    //Used to know what page the User is on so we can highlight which page they are on with the Sidebar
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
    };

    return renderThis();
};

export default SidebarButton;