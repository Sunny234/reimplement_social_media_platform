import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import {useParams } from 'react-router-dom';

const SearchResults = () => {

    let resultList = [];
    const [resultsList, setResultsList] = useState([]);
    const { searchTerm } = useParams();
    const [searchInput, setSearchInput] = useState(`${searchTerm}`);
    
    const listContains = (list, id) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i]["id"] === id) {
                return true;
            }
        }
        return false;
    };
    const getResults = () => {
        var axios = require('axios');
        let data = {"searchQuery":searchInput, "token": window.sessionStorage.getItem("access_token"), "secret":window.sessionStorage.getItem("access_secret")}
        var config = {
        method: 'post',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/SearchTweets',
        headers: { 
            'Content-Type': 'text/plain'
        },
        data: data,
        };
        axios(config)
        .then(function (response) {
            //let resp_object = JSON.parse(response.data["body"]);
            //console.log(resp_object);
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
                retweeted_user = response.data[x]["retweeted_status"]["user"]["name"];
                retweeted_screen_name = response.data[x]["retweeted_status"]["user"]["screen_name"];
                retweeted_profile_image = response.data[x]["retweeted_status"]["user"]["profile_image_url_https"];
                retweeted_text = response.data[x]["retweeted_status"]["full_text"]; 
            }
            let in_reply_to_user = response.data[x]["in_reply_to_screen_name"];
            let is_quote_status = response.data[x]["is_quote_status"];
            if(listContains(resultList, tweet_id) === false) {
                resultList.push({
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
                console.log(response.data[x]);
            }
        }
        setResultsList(resultList);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    useEffect(()=>{
        getResults();
    },[searchInput])

    return (
        <div className="search-results-container">
            <Search searchInput = {searchInput} setSearchInput ={setSearchInput}/>
            <Sidebar/>
            <Feed tweetsList={resultsList} styles="feed-search" setTweetsList={setResultsList}/>
        </div>
    )
};

export default SearchResults;