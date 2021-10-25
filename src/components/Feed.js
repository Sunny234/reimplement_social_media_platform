import React from 'react'
import Tweet from './Tweet'

 const Feed = ({ tweetsList }) => {
    return (
        <div className="feed">
            {tweetsList.map((tweet)=>
                <Tweet user = {tweet.user} tweet_content = {tweet.tweet_content} in_reply_to = {tweet.in_reply_to} key = {tweet.id} />)}
        </div>
    )
};

export default Feed;
