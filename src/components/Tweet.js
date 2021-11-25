import React from 'react';
import {Link} from 'react-router-dom';

const Tweet = ({user, screen_name, profile_image, tweet_content, tweet_image,  in_reply_to, retweeted_user, retweeted_screen_name, retweeted_profile_image, retweeted_text, is_quote_status, favorited, retweeted, retweet_count, favorite_count, id }) => {

    //Sends User to the Individual Tweet page
    const viewSingleTweetHandler = (e) => {
        return `/tweet/${id}`;
    };
    
    //Checks whether Tweet has an image
    const hasImage = () => {
        if(tweet_image !== null) {
            return (
                <img src={tweet_image} alt={`${tweet_image}`} className="tweeted_image"></img>
            );
        } else {
            return;
        }
    };

    //Checks whether Tweet is a reply to another Tweet
    const isReply = () => {
        if(in_reply_to !== null) {
            return (
                <h2>In reply to {in_reply_to}</h2>
                );
        }
    };

    const renderLike = () => {
        if(favorited === true) {
            return (
                <span className="tweet-action-button">
                    <button onClick={likeHandler}>
                        <i style={{color: "red"}} className="fas fa-heart"></i>
                    </button>
                    <h3> {favorite_count}</h3>
                </span>
                );
        } else {
            return (
                <span className="tweet-action-button">
                    <button onClick={likeHandler}>
                        <i className="far fa-heart"></i>
                    </button>
                    <h3> {favorite_count}</h3>
                </span>
                );
        }
    }

    const renderRetweet = () => {
        if(retweeted === true)
            return (
                <span className="tweet-action-button">
                    <button onClick={retweetHandler}>
                        <i style={{color: "green"}} className="fas fa-retweet"></i>
                    </button>
                    <h3> {retweet_count}</h3>
                </span>
                );
        else
            return (
                <span className="tweet-action-button">
                    <button onClick={retweetHandler}>
                        <i className="fas fa-retweet"></i>
                    </button>
                    <h3> {retweet_count}</h3>
                </span>
                );
    }

    //Checks if Tweet was a Retweet of another Tweet and renders the correct information
    const isRetweet = () => {
        if(retweeted_user !== null) {
            return (
                <div className="tweet-container">
                    <h2>{user} Retweeted</h2>
                    {isReply()}
                    <img src={retweeted_profile_image} alt={retweeted_screen_name} className="tweet-profile-image"></img>
                    <div className="content-wrapper">
                        <h1>{retweeted_user} <i>@{retweeted_screen_name}</i></h1>
                        <p>{retweeted_text}</p>
                        {hasImage()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="tweet-container">
                    {isReply()}
                    <img src={profile_image} alt={screen_name} className="tweet-profile-image"></img>
                    <h1>{user} <i>@{screen_name}</i></h1>
                    <p>{tweet_content}</p>
                    {hasImage()}
                </div>
            );
        }
    };

    const likeHandler = () => {
        console.log(favorite_count);
        if(favorited === true) {
            favorited = false;
            favorite_count--;
        } else {
            favorited = true;
            favorite_count++;
        }
        console.log(favorited);
    }

    const retweetHandler = () => {
        console.log(retweet_count);
    }

    return (
        <div className="tweet-hover">
            <Link to={viewSingleTweetHandler} className="link">
                    <div className="tweet">
                        {isRetweet()}
                    </div>
            </Link>
            <div className="tweet-actions">
                {renderLike()}
                {renderRetweet()}
            </div>
        </div>
    );
};

export default Tweet;
