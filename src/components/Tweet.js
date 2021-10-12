import React from 'react'
import profile from '../blank-profile-picture.png';

const Tweet = ({user, tweet_content}) => {
    return (
        <div className="tweet-container">
            <a href="/"><img src={profile} alt={user}></img></a>
            <h1 className="tweet-content">{user}</h1>
            <p className="tweet-content">{tweet_content}</p>
        </div>
    )
}

export default Tweet
