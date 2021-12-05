import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import Feed from "./Feed"

const ProfileMain = () => {
    let tweetList = [];
    const [tweetsList, setTweetsList] = useState([]);
    let userProfileDict={};
    let { user_ID } = useParams();

    const tweetListContains = (list, id) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i]["id"] === id) {
                return true;
            }
        }
        return false;
    };

    const getTweets = () => {
        var axios = require('axios');
        let data = {};
        if (user_ID != null) {
            data = {"access_token": window.sessionStorage.getItem("access_token"), "access_token_secret": window.sessionStorage.getItem("access_secret"), "user_id": user_ID };
        }
        else {
            data = {"access_token": window.sessionStorage.getItem("access_token"), "access_token_secret": window.sessionStorage.getItem("access_secret"), "user_id": "null" };
        }
        var config = {
        method: 'post',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/GetProfile',
        headers: { 
            'Content-Type': 'text/plain'
        },
        data: data
        }
        axios(config)
        .then(function (response) {
        let username = response.data[0]["name"];
        let screen_name = response.data[0]["screen_name"];
        let profile_image = response.data[0]["profile_image_url_https"];
        userProfileDict = {
            "user": username,
            "screen_name": screen_name,
            "profile_image": profile_image
        };
        window.sessionStorage.setItem("user_info", userProfileDict);
        console.log(userProfileDict["user"]);
        for(let x in response.data[1]) {
            let username = response.data[1][x]["user"]["name"];
            let screen_name = response.data[1][x]["user"]["screen_name"];
            let profile_image = response.data[1][x]["user"]["profile_image_url_https"]
            let tweet_id = response.data[1][x]["id_str"];
            let text = response.data[1][x]["full_text"];
            let tweet_image = null;
            if(response.data[1][x]["entities"]["media"] !== undefined) {
            tweet_image = response.data[1][x]["entities"]["media"][0]["media_url_https"];
            }
            let retweeted = response.data[1][x]["retweeted"];
            let favorited = response.data[1][x]["favorited"];
            let retweet_count = response.data[1][x]["retweet_count"];
            let favorite_count = response.data[1][x]["favorite_count"];
            let retweeted_user = null;
            let retweeted_text = null;
            let retweeted_screen_name = null;
            let retweeted_profile_image = null;
            if(response.data[1][x]["retweeted_status"] !== undefined) {
                favorite_count = response.data[1][x]["retweeted_status"]["favorite_count"];
                retweeted_user = response.data[1][x]["retweeted_status"]["user"]["name"];
                retweeted_screen_name =response.data[1][x]["retweeted_status"]["user"]["screen_name"];
                retweeted_profile_image = response.data[1][x]["retweeted_status"]["user"]["profile_image_url_https"];
                retweeted_text = response.data[1][x]["retweeted_status"]["full_text"]; 
            }
            let in_reply_to_user = response.data[1][x]["in_reply_to_screen_name"];
            let is_quote_status = response.data[1][x]["is_quote_status"];
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
                console.log("ADDED");
            }
        }
        setTweetsList(tweetList);
        })
        .catch(function (error) {
        console.log(error);
        });
    };

    useEffect(()=>{
        getTweets();
    },[]);

    return (
        <div className="profile-wrapper">
            <div className="profile">
                <div className="profile-container">
                    <span>
                        <img src="" className="profile-img" alt="Profile"/><h1>{}</h1>
                    </span>
                </div>
            </div>
            <Feed tweetsList={tweetsList} styles="feed-search"/>
        </div>
        
    )
}

export default ProfileMain
