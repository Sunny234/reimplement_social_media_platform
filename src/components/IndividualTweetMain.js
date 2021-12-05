import React, { useEffect, useState , useRef} from 'react';
import Feed from './Feed';

 const IndividualTweetMain = ({tweetID}) => {

    let tweet = {};
    let tweetList = [];
    const tweetsList = useRef([]);
    const [alreadyDid, setAlreadyDid] = useState(false);


    const getIndividualTweet = () => {
        if (alreadyDid === false)
        {
            var axios = require('axios');
            console.log("here");
            let data = {"id": tweetID, "token": window.sessionStorage.getItem("access_token"), "secret": window.sessionStorage.getItem("access_secret")};
            console.log(typeof(data));
            var config = {
            method: 'post',
            url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/ReadTweet',
            headers: { 
                'Content-Type': 'text/plain'
                },
            data: data,
            };
            axios(config)
            .then(function (response) {
            console.log(response.data);
            let username = response.data["user"]["name"];
            let screen_name = response.data["user"]["screen_name"];
            let profile_image = response.data["user"]["profile_image_url_https"]
            let tweet_id = response.data["id_str"];
            let text = response.data["full_text"];
            let tweet_image = null;
            if(response.data["entities"]["media"] !== undefined) {
                tweet_image = response.data["entities"]["media"][0]["media_url_https"];
            }
            let retweeted = response.data["retweeted"];
            let favorited = response.data["favorited"];
            let retweet_count = response.data["retweet_count"];
            let favorite_count = response.data["favorite_count"];
            let retweeted_user = null;
            let retweeted_text = null;
            let retweeted_screen_name = null;
            let retweeted_profile_image = null;
            if(response.data["retweeted_status"] !== undefined) {
                retweeted = response.data["retweeted_status"]["retweeted"];
                favorited = response.data["retweeted_status"]["favorited"];
                retweet_count = response.data["retweeted_status"]["retweet_count"];
                favorite_count = response.data["retweeted_status"]["favorite_count"];
                retweeted_user = response.data["retweeted_status"]["user"]["name"];
                retweeted_screen_name =response.data["retweeted_status"]["user"]["screen_name"];
                retweeted_profile_image = response.data["retweeted_status"]["user"]["profile_image_url_https"];
                retweeted_text = response.data["retweeted_status"]["full_text"]; 
            }
            let in_reply_to_user = response.data["in_reply_to_screen_name"];
            let is_quote_status = response.data["is_quote_status"];
            tweet=({
                "user": username, 
                "screen_name": screen_name,
                "profile_image": profile_image,
                "tweet_content": text, 
                "tweet_image": tweet_image,
                "in_reply_to": in_reply_to_user, 
                "retweeted_user": retweeted_user,
                "retweeted_screen_name": retweeted_screen_name,
                "retweeted_profile_image": retweeted_profile_image,
                "retweeted_text": retweeted_text,
                "is_quote_status": is_quote_status,
                "retweet_count": retweet_count,
                "favorite_count": favorite_count,
                "favorited": favorited,
                "retweeted": retweeted,
                "id": tweet_id 
                });
            tweetList.push(tweet);
            tweetsList.current = tweetList;
            console.log(`${tweet}`);
            setAlreadyDid(true);
            console.log(tweetsList);
            })
            .catch(function (error) {
                console.log(error);
            });
        }   
    };

    useEffect(()=>{
        getIndividualTweet();
    },[alreadyDid]);
    
    return ( 
        <div>
            <Feed tweetsList={tweetsList.current} styles="individual-tweet-main"/>
        </div>
    );
};

export default IndividualTweetMain;