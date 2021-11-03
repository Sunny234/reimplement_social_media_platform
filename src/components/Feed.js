import React from 'react'
import Tweet from './Tweet'

 const Feed = ({ tweetsList, styles }) => {

    const renderThis = () => {
        if(styles === "feed") {
            return (
                <div className={styles}> 
                {tweetsList.map((tweet)=>
                    <Tweet tweetsList={tweetsList} user={tweet.user} 
                    screen_name={tweet.screen_name} profile_image={tweet.profile_image} 
                    tweet_content={tweet.tweet_content} tweet_image={tweet.tweet_image} in_reply_to={tweet.in_reply_to} 
                    retweeted_user={tweet.retweeted_user} retweeted_screen_name={tweet.retweeted_screen_name} 
                    retweeted_profile_image={tweet.retweeted_profile_image} 
                    retweeted_text={tweet.retweeted_text} is_quote_status={tweet.is_quote_status} 
                    retweet_count={tweet.retweet_count} favorite_count={tweet.favorite_count} 
                    id={tweet.id} key={tweet.id} />)}
                </div>
                );
            } else if(styles === "feed_search") {
                return (
                <div className={styles}> 

                </div>
                )
            } else if(styles === "individual-tweet-main"){
                return (
                    <div className={styles}>
                    {tweetsList.map((tweet)=>
                        <Tweet tweetsList={tweetsList} user={tweet.user} 
                        screen_name={tweet.screen_name} profile_image={tweet.profile_image} 
                        tweet_content={tweet.tweet_content} tweet_image={tweet.tweet_image} in_reply_to={tweet.in_reply_to} 
                        retweeted_user={tweet.retweeted_user} retweeted_screen_name={tweet.retweeted_screen_name} 
                        retweeted_profile_image={tweet.retweeted_profile_image} 
                        retweeted_text={tweet.retweeted_text} is_quote_status={tweet.is_quote_status} 
                        retweet_count={tweet.retweet_count} favorite_count={tweet.favorite_count} 
                        id={tweet.id} key={tweet.id} />)}
                    </div>
                );
            } else {
                return (
                    <div className={styles}> 
    
                    </div>
                )
            }
        }

    return renderThis();
};

export default Feed;