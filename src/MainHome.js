import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import CreateTweet from './components/CreateTweet'

const MainHome = () => {

    let tweetList = [];
    const [tweetInput, setTweetInput] = useState("");
    const [tweetsList, setTweetsList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [updated, setUpdated] = useState(0);
    let prevUpdated = updated;

    const tweetListContains = (list, id) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i]["id"] === id) {
                return true;
            }
        }
        return false;
    };

    const getTweets = () => {
        if (Date.now() - window.sessionStorage.getItem("home_timeline_last_updated") < 300000)
        {
            console.log(window.sessionStorage.getItem("home_timeline"));
            setTweetsList(JSON.parse(window.sessionStorage.getItem("home_timeline")));
            console.log("Called sessionStorage");
        }        
        else
        { 
            var axios = require('axios');
            let data = {"access_token": window.sessionStorage.getItem("access_token"), "access_token_secret": window.sessionStorage.getItem("access_secret") };
            var config = {
            method: 'post',
            url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/LoadTimeline',
            headers: { 
                'Content-Type': 'text/plain'
            },
            data: data
            }
            axios(config)
            .then(function (response) {
            for(let x in response.data) {
                let username = response.data[x]["user"]["name"];
               let screen_name = response.data[x]["user"]["screen_name"];
                let profile_image = response.data[x]["user"]["profile_image_url_https"]
               let tweet_id = response.data[x]["id_str"];
               let text = response.data[x]["full_text"];
                let tweet_image = null;
                if(response.data[x]["entities"]["media"] !== undefined) {
                tweet_image = response.data[x]["entities"]["media"][0]["media_url_https"];
                }
                let retweeted = response.data[x]["retweeted"];
                let favorited = response.data[x]["favorited"];
                let retweet_count = response.data[x]["retweet_count"];
                let favorite_count = response.data[x]["favorite_count"];
                let retweeted_user = null;
                let retweeted_text = null;
                let retweeted_screen_name = null;
                let retweeted_profile_image = null;
                if(response.data[x]["retweeted_status"] !== undefined) {
                    favorite_count = response.data[x]["retweeted_status"]["favorite_count"];
                    retweeted_user = response.data[x]["retweeted_status"]["user"]["name"];
                    retweeted_screen_name =response.data[x]["retweeted_status"]["user"]["screen_name"];
                    retweeted_profile_image = response.data[x]["retweeted_status"]["user"]["profile_image_url_https"];
                    retweeted_text = response.data[x]["retweeted_status"]["full_text"]; 
                }
                let in_reply_to_user = response.data[x]["in_reply_to_screen_name"];
                let is_quote_status = response.data[x]["is_quote_status"];
                if(tweetListContains(tweetList, tweet_id) === false) {
                    tweetList.push({
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
                        "favorited": favorited,
                        "retweeted": retweeted,
                        "retweet_count": retweet_count,
                        "favorite_count": favorite_count,
                        "id": tweet_id 
                    });

                }
            }
            window.sessionStorage.setItem("home_timeline", JSON.stringify(tweetList));
            window.sessionStorage.setItem("home_timeline_last_updated", Date.now());
            console.log("Called API");
            console.log(JSON.stringify(window.sessionStorage.getItem("home_timeline")));
            console.log(window.sessionStorage.getItem("home_timeline_last_updated"));
            setTweetsList(tweetList);

            })
            .catch(function (error) {
                //alert(error.response.status + ": " + error.response.data["message"]);
                alert(error);
            });
        }
    };

    useEffect(()=>{
        if (prevUpdated != updated)
        {
            window.sessionStorage.setItem("home_timeline_last_updated", 0);
            getTweets();
        }
        else
        {
            getTweets();
        }
    },[updated])

    return (
        <div className="main-container">
            <Search searchInput = {searchInput} setSearchInput={setSearchInput}/>
            <Sidebar/>
            <Feed tweetsList={tweetsList} styles="feed" setTweetsList={setTweetsList}/>
            <CreateTweet tweetsList={tweetsList} setTweetsList={setTweetsList} tweetInput={tweetInput} setTweetInput={setTweetInput} styles="create-tweet" update = {updated} setUpdated = {setUpdated}/>
        </div>
    )
};

export default MainHome;

            