import React, { useState } from 'react'
import Search from "./components/Search"
import Sidebar from "./components/Sidebar"
import ProfileMain from './components/ProfileMain'

const Profile = () => {
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className="main-container">
            <Search searchInput = {searchInput} setSearchInput={setSearchInput}/>
            <Sidebar/>
            <ProfileMain/>
        </div>
    )
};

export default Profile;