import React, { useEffect, useState , useRef} from 'react'
import Tweet from './Tweet'
import Feed from './Feed'

 const IndividualTweetMain = ({tweetID}) => {

    let tweet = {};
    let tweetList = [];
    const tweetsList = useRef([]);
    const [alreadyDid, setAlreadyDid] = useState(false);

    //Get tweet ID in here somehow
    //Use ReadTweet to get the contents of that Tweet
    //Display Tweet
    const getIndividualTweet = () => {
        if (alreadyDid == false)
        {  
        var axios = require('axios');
        console.log("here");
        let data = {"id": tweetID, "token": "1454729415011700738-ib7ql4SU5vag2PBOtoMAeFPc2dyxXF", "secret": "osxGjJfDEvQEc0oiWlefuyFM7IQbkj8FhrsXOMHpCvuJ1"};
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
        //for(let x in response.data) {
        console.log(response.data)
        let username = response.data["user"]["name"];
        let screen_name = response.data["user"]["screen_name"];
        let profile_image = response.data["user"]["profile_image_url_https"]
        let tweet_id = response.data["id"];
        let text = response.data["full_text"];
        let retweet_count = response.data["retweet_count"];
        let favorite_count = response.data["favorite_count"];
        let retweeted_user = null;
        let retweeted_text = null;
        let retweeted_screen_name = null;
        let retweeted_profile_image = null;
        if(response.data["retweeted_status"] !== undefined) {
            retweeted_user = response.data["retweeted_status"]["user"]["name"];
            retweeted_screen_name =response.data["retweeted_status"]["user"]["screen_name"];
            retweeted_profile_image = response.data["retweeted_status"]["user"]["profile_image_url_https"];
            retweeted_text = response.data["retweeted_status"]["text"]; 
        }
        let in_reply_to_user = response.data["in_reply_to_user_id"];
        let is_quote_status = response.data["is_quote_status"];
        //if(tweetListContains(tweetList, tweet_id) === false) {
        tweet=({
            user: username, 
            screen_name: screen_name,
            profile_image: profile_image,
            tweet_content: text, 
            in_reply_to: in_reply_to_user, 
            retweeted_user: retweeted_user,
            retweeted_screen_name: retweeted_screen_name,
            retweeted_profile_image: retweeted_profile_image,
            retweeted_text: retweeted_text,
            is_quote_status: is_quote_status,
            retweet_count: retweet_count,
            favorite_count: favorite_count,
            id: tweet_id 
            });
        tweetList.push(tweet);
        tweetsList.current = tweetList;
        console.log(`${tweet}`);
        setAlreadyDid(true);

        })
        .catch(function (error) {
            console.log(error);
        })

        }   
        
    };
    //setTweetsList(tweetList);
    //})

    useEffect(()=>{
        getIndividualTweet();
    },[alreadyDid])


    
    return ( <div>
        <div className="single-main-container" >
        <Feed tweetsList={tweetsList.current} styles="feed"/>
        </div>
    </div>);
    
};

/*<Tweet tweet={tweet} user={tweet.user} 
screen_name={tweet.screen_name} profile_image={tweet.profile_image} 
tweet_content={tweet.tweet_content} in_reply_to={tweet.in_reply_to} 
retweeted_user={tweet.retweeted_user} retweeted_screen_name={tweet.retweeted_screen_name} 
retweeted_profile_image={tweet.retweeted_profile_image} 
retweeted_text={tweet.retweeted_text} is_quote_status={tweet.is_quote_status} 
retweet_count={tweet.retweet_count} favorite_count={tweet.favorite_count} 
id={tweet.id} key={tweet.id} />*/

export default IndividualTweetMain;