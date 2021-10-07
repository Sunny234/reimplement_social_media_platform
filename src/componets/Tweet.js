import React from 'react'
import profile from '../blank-profile-picture.png';

const Tweet = ({user, tweet_content}) => {
    return (
        <div className="tweet-container">
            <a href="/"><img src={profile} alt={user}></img></a>
            <div className="tweet-content">
                <h1>{user}</h1>
                <p>{tweet_content}</p>
            </div>
        </div>
    )
}

export default Tweet
