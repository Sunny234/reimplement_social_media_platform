import React from 'react'
import Search from "./components/Search"
import Sidebar from "./components/Sidebar"
import ProfileMain from './components/ProfileMain'


const Profile = () => {
    return (
        <div className="main-container">
            <Search/>
            <Sidebar/>
            <ProfileMain/>
        </div>
    )
};

export default Profile;