import React, { useState, useEffect, useRef } from 'react'
import {useParams} from 'react-router-dom';
import Feed from "./Feed"
import loadingIcon from "../images/blank-profile-picture.png";

const ProfileMain = () => {
    let tweetList = [];
    const tweetsList = useRef([]);
    const [alreadyDid, setAlreadyDid] = useState(false);
    let { user_ID } = useParams();
    const userProfileDict = useRef({user: "loading", bio: "loading", following_count: "loading", followers_count: "loading", screen_name: "loading", profile_image: loadingIcon});
    let userProfileDictTemp = {
        user: "loading",
        bio: "loading",
        following_count: "loading",
        followers_count: "loading",
        screen_name: "loading",
        profile_image: loadingIcon,
        follow: "loading"
    };
    

    const tweetListContains = (list, id) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i]["id"] === id) {
                return true;
            }
        }
        return false;
    };

    console.log(user_ID)

    const getTweets = () => {
        if (alreadyDid === false)
        {
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
            console.log(response.data);

            userProfileDictTemp.user = response.data[0]["name"];
            userProfileDictTemp.bio = response.data[0]["description"];
            userProfileDictTemp.following_count = response.data[0]["friends_count"];
            userProfileDictTemp.followers_count = response.data[0]["followers_count"];
            userProfileDictTemp.screen_name = response.data[0]["screen_name"];
            userProfileDictTemp.profile_image = response.data[0]["profile_image_url_https"];
            if (user_ID != response.data[2]["screen_name"] && user_ID != null)
            {
                if (response.data[3]["followed_by"] == true)
                {
                    userProfileDictTemp.follow = "Unfollow";
                }
                else
                {
                    userProfileDictTemp.follow = "Follow";
                }
            }
            else
            {
                userProfileDictTemp.follow = null;
            }   
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
            userProfileDict.current = userProfileDictTemp;
            tweetsList.current = tweetList;
            setAlreadyDid(true);
            })
            .catch(function (error) {
                console.log(error);
                //alert(error.response.status + ": " + error.response.data["message"]);
            });
        }
    };

    const buttonSpawn = (followStatus) => {
        if (followStatus = "Follow")
        {
            return <button onClick={followHandler}  className="create-tweet-button">{userProfileDict.current.follow}</button>
        }
        else if (followStatus = "Unfollow")
        {
            return <button onClick={followHandler}  className="create-tweet-button">{userProfileDict.current.follow}</button>
        }
    }

    const followHandler = () => {
        var axios = require('axios');
            let data = {"token": window.sessionStorage.getItem("access_token"), "secret": window.sessionStorage.getItem("access_secret"), "screen_name": user_ID, "status": userProfileDict.current.follow };
            var config = {
            method: 'post',
            url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/FollowUser',
            headers: { 
                'Content-Type': 'text/plain'
            },
            data: data
            }
            axios(config)
            .then(function (response) {
                    })
            .catch(function (error) {
                alert(error.response.status + ": " + error.response.data["message"]);
            });
    }

    useEffect(()=>{
        getTweets();
    },[alreadyDid]);

    return (
        <div className="profile-wrapper">
            <div className="profile">
                <span className="profile-container">
                    <img src={userProfileDict.current.profile_image} className="profile-img" alt="Profile"/>
                    <h1>{userProfileDict.current.user}</h1>
                    <p>{userProfileDict.current.bio}</p>
                    <h2>{userProfileDict.current.following_count} Following</h2>
                    <h2>{userProfileDict.current.followers_count} Followers</h2>
                    {buttonSpawn(userProfileDict.current.follow)}
                </span>
            </div>
            <Feed tweetsList={tweetsList.current} styles="feed-search"/>
        </div>
        
    )
}

export default ProfileMain
