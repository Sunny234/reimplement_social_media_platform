import React, { useState } from 'react'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import CreateTweet from './components/CreateTweet'

const MainHome = () => {

    const [tweetInput, setTweetInput] = useState("");
    const [tweetsList, setTweetsList] = useState([]);
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
        <div className="main-container">
            <Search/>
            <Sidebar/>
            <Feed tweetsList={tweetsList} setTweetsList={setTweetsList}/>
            <CreateTweet tweetsList={tweetsList} setTweetsList={setTweetsList} tweetInput={tweetInput} setTweetInput={setTweetInput} />
        </div>
    )
};

export default MainHome;

            