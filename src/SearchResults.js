import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import {useParams } from 'react-router-dom';

const SearchResults = () => {

    let tweetList = [];
    const [resultsList, setResultsList] = useState([]);
    const { searchTerm } = useParams();
    const [searchInput, setSearchInput] = useState(`${searchTerm}`);
    
    const tweetListContains = (list, id) => {
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
    const getTweets = () => {
        var axios = require('axios');
        let data = searchInput ;//{"searchQuery":searchInput, "token": "tYAga0fPzoEXzwf3GZ9EzRIIJ", "secret":"xfrXLbK3Yezo7s0b8E9JwoSK4mBUWDvVAyy1spuefUWLsM226I"}
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
        for(let x in response.data) {
            let username = response.data[x]["user"]["name"];
            let screen_name = response.data[x]["user"]["screen_name"];
            let profile_image = response.data[x]["user"]["profile_image_url_https"]
            let tweet_id = response.data[x]["id"];
            let text = response.data[x]["text"];
            let retweet_count = response.data[x]["retweet_count"];
            let favorite_count = response.data[x]["favorite_count"];
            let retweeted_user = null;
            let retweeted_text = null;
            let retweeted_screen_name = null;
            let retweeted_profile_image = null;
            if(response.data[x]["retweeted_status"] !== undefined) {
                retweeted_user = response.data[x]["retweeted_status"]["user"]["name"];
                retweeted_screen_name =response.data[x]["retweeted_status"]["user"]["screen_name"];
                retweeted_profile_image = response.data[x]["retweeted_status"]["user"]["profile_image_url_https"];
                retweeted_text = response.data[x]["retweeted_status"]["text"]; 
            }
            let in_reply_to_user = response.data[x]["in_reply_to_user_id"];
            let is_quote_status = response.data[x]["is_quote_status"];
            if(tweetListContains(tweetList, tweet_id) === false) {
                tweetList.push({
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
                console.log("ADDED!");
            }
        }
        setResultsList(tweetList);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    useEffect(()=>{
        if (searchInput != null) {getTweets();}    
    },[])

    return (
        <div className="search-results-container">
            <Search searchInput = {searchInput} setSearchInput={setSearchInput}/>
            <Sidebar/>
            <Feed tweetsList={resultsList} styles="feed_search" setTweetsList={setResultsList}/>
        </div>
        
    )
};

export default SearchResults;