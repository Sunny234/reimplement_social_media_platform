import React from 'react';
import {Link} from 'react-router-dom';

const Tweet = ({user, screen_name, profile_image, tweet_content, in_reply_to, retweeted_user, retweeted_screen_name, retweeted_profile_image, retweeted_text, is_quote_status, retweet_count, favorite_count, id }) => {

    const viewSingleTweetHandler = (e) => {
        return `/${id}`;
    };
    
    const isReply = () => {
        if(in_reply_to !== null) {
                    return (<h2>In reply to {in_reply_to}</h2>);
        }
    };

    const isRetweet = () => {
        if(retweeted_user !== null) {
            return (
                <div className="tweet-container">
                    <h2>{user} Retweeted</h2>
                    {isReply()}
                    <img src={retweeted_profile_image} alt={retweeted_screen_name}></img>
                    <h1>{retweeted_user} <i>@{retweeted_screen_name}</i></h1>
                    <p>{retweeted_text}</p>
                </div>
            );
        } else {
            return (
                <div className="tweet-container">
                    {isReply()}
                    <img src={profile_image} alt={screen_name}></img>
                    <h1>{user} <i>@{screen_name}</i></h1>
                    <p>{tweet_content}</p>
                </div>
            );
        }
    }

    return (
        <Link to={viewSingleTweetHandler} className="link">
            <div className="tweet-hover">
                <div className="tweet">
                    {isRetweet()}
                </div>
            </div>
        </Link>
    )
};

export default Tweet;
