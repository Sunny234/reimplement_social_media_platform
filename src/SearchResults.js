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
    /*
    const axios = require('axios');
    const data = '1450591326479831040';

    const config = {
        method: 'get',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/ReadTweet',
        headers: { 
        'Content-Type': 'text/plain',
        },
        data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
         console.log(error);
    });*/


    //Fetch Timeline
    //Get Tweets from Timeline into State
    const getResults = () => {
        var axios = require('axios');
        let data = {"searchQuery":searchInput, "token": "1454729415011700738-ib7ql4SU5vag2PBOtoMAeFPc2dyxXF", "secret":"osxGjJfDEvQEc0oiWlefuyFM7IQbkj8FhrsXOMHpCvuJ1"}
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
            let resp_object = JSON.parse(response.data["body"]);
            console.log(resp_object);
        for(let x in resp_object) {
            let username = resp_object[x]["user"]["name"];
            let screen_name = resp_object[x]["user"]["screen_name"];
            let profile_image = resp_object[x]["user"]["profile_image_url_https"]
            let tweet_id = resp_object[x]["id_str"];
            let text = resp_object[x]["full_text"];
            let tweet_image = null;
            if(resp_object[x]["entities"]["media"] !== undefined) {
            tweet_image = resp_object[x]["entities"]["media"][0]["media_url_https"];
            }
            let retweet_count = resp_object[x]["retweet_count"];
            let favorite_count = resp_object[x]["favorite_count"];
            let retweeted_user = null;
            let retweeted_text = null;
            let retweeted_screen_name = null;
            let retweeted_profile_image = null;
            if(resp_object[x]["retweeted_status"] !== undefined) {
                retweeted_user = resp_object[x]["retweeted_status"]["user"]["name"];
                retweeted_screen_name = resp_object[x]["retweeted_status"]["user"]["screen_name"];
                retweeted_profile_image = resp_object[x]["retweeted_status"]["user"]["profile_image_url_https"];
                retweeted_text = resp_object[x]["retweeted_status"]["full_text"]; 
            }
            let in_reply_to_user = resp_object[x]["in_reply_to_screen_name"];
            let is_quote_status = resp_object[x]["is_quote_status"];
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
                    "retweet_count": retweet_count,
                    "favorite_count": favorite_count,
                    "id": tweet_id 
                });
                console.log("ADDED!");
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
    },[])

    return (
        <div className="search-results-container">
            <Search searchInput = {searchInput} setSearchInput={setSearchInput}/>
            <Sidebar/>
            <Feed tweetsList={resultsList} styles="feed-search" setTweetsList={setResultsList}/>
        </div>
    )
};

export default SearchResults;