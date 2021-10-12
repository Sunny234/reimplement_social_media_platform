import React from 'react'

const SidebarButton = ({text, URL}) => {
    return (
        <a className="sidebar-button-text" href={URL}>{text}</a>
    )
}

export default SidebarButton
