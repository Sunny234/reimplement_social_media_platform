import React from 'react'
import profile from '../images/blank-profile-picture.png';

const ProfileMain = () => {
    return (
        <div className="profile">
            <div className="profile-container">
                <span>
                    <img src={profile} alt="Profile"/><h1>Lorem Ipsum</h1>
                </span>
            </div>
        </div>
    )
}

export default ProfileMain
