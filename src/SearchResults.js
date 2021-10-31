import React, { useState } from 'react'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import {useParams } from 'react-router-dom';

const SearchResults = () => {

    const [tweetsList, setTweetsList] = useState([]);
    const { searchTerm } = useParams();
    const [searchInput, setSearchInput] = useState(`${searchTerm}`);
   
    //setSearchInput(searchInput, query);
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

    return (
        <div className="search-results-container">
            <Search searchInput = {searchInput} setSearchInput={setSearchInput}/>
            <Sidebar/>
            <Feed tweetsList={tweetsList} styles="feed_search" setTweetsList={setTweetsList}/>
        </div>
        
    )
};

export default SearchResults;