import React from 'react'
import {Link} from 'react-router-dom';


const SidebarButton = ({text, URL}) => {
    return (
        <Link to={URL} className="sidebar-button-text">{text}</Link>
    )
};

export default SidebarButton;