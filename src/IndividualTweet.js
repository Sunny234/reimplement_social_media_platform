import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Sidebar from './components/Sidebar';
import IndividualTweetMain from './components/IndividualTweetMain';
import CreateTweet from './components/CreateTweet';
import {useParams } from 'react-router-dom';


const IndividualTweet = () => {
    let { tweetID } = useParams();
    let [ID, setID] = useState(`${tweetID}`);

    return (
        <div className="main-container">
            <Search/>
            <Sidebar/>
            <IndividualTweetMain tweetID={ID}/>
            <CreateTweet styles="reply"/>
        </div>
    );
};

export default IndividualTweet;