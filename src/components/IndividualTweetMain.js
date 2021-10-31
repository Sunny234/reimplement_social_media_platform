import React from 'react'
import Tweet from './Tweet'

 const IndividualTweetMain = ({ tweetsList, setTweetsList }) => {

    return (
        <div className="feed">
            {tweetsList.map((tweet)=>
                <Tweet tweetsList={tweetsList} id={tweet.id} user = {tweet.user} tweet_content = {tweet.tweet_content} in_reply_to = {tweet.in_reply_to} key = {tweet.id} />)}
        </div>
    )
};

export default IndividualTweetMain;