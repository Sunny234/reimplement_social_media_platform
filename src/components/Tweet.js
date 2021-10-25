import React from 'react'
import profile from '../images/blank-profile-picture.png';

const Tweet = ({user, tweet_content, in_reply_to}) => {
    
    const viewSingleTweetHandler = () => {
        
    };
    
    const isReply = () => {
        if(in_reply_to !== null) {
            return (<h2>In reply to {in_reply_to}</h2>);
        }
    };

    return (
        <div onClick={viewSingleTweetHandler} className="tweet-hover">
            <div className="tweet">
                <div className="tweet-container">
                    {isReply()}
                    <img src={profile} alt={user}></img>
                    <h1>{user}</h1>
                    <p>{tweet_content}</p>
                </div>
            </div>
        </div>
    )
};

export default Tweet;
