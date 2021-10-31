import React from 'react'

const Tweet = ({user, screen_name, profile_image, tweet_content, in_reply_to, retweeted_user, retweeted_screen_name, retweeted_profile_image, retweeted_text, is_quote_status, retweet_count, favorite_count, id }) => {

    const viewSingleTweetHandler = (e) => {
        console.log(id);
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
        <div onClick={viewSingleTweetHandler} className="tweet-hover">
            <div className="tweet">
                {isRetweet()}
            </div>
        </div>
    )
};

export default Tweet;
