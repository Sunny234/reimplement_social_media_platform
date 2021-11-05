import React from 'react';
import SidebarButton from './SidebarButton';
import SignOutButton from './SignOutButton';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><SidebarButton text="Home" URL="/home"/></li>
                <li><SidebarButton text="Search" URL="/search"/></li>
                <li><SidebarButton text="Profile" URL="/profile"/></li>
                <li><SignOutButton text="Sign out" URL="/"/></li>
            </ul>
        </div>
    );
};

export default Sidebar;
