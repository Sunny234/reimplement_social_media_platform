import React from 'react'
import Search from "./components/Search"
import Sidebar from "./components/Sidebar"
import CreateTweet from "./components/CreateTweet"
import profile from './images/blank-profile-picture.png';

const Profile = () => {
    return (
        <div className="main-container">
            <Search/>
            <Sidebar/>
            <div className="profile">
                <img src={profile} alt="Profile"/>
                <h1>Lorem Ipsum</h1>
            </div>
            <CreateTweet/>
        </div>
    )
};

export default Profile;