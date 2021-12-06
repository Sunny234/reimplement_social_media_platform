import React, { useState } from 'react';
import Search from './components/Search';
import Sidebar from './components/Sidebar';
import IndividualTweetMain from './components/IndividualTweetMain';
import CreateTweet from './components/CreateTweet';
import {useParams } from 'react-router-dom';


const IndividualTweet = () => {
    let { tweetID } = useParams();
    //let [ID, setID] = useState(`${tweetID}`);
    const [searchInput, setSearchInput] = useState(``);
    const [itweetInput, isetTweetInput] = useState("");
    const [updated, setUpdated] = useState(0);

    return (
        <div className="main-container">
            <Search searchInput = {searchInput} setSearchInput = {setSearchInput}/>
            <Sidebar/>
            <IndividualTweetMain tweetID={`${tweetID}`}/>
            <CreateTweet styles="reply" tweetInput={itweetInput} setTweetInput={isetTweetInput} updated = {updated} setUpdated = {setUpdated} replyID={`${tweetID}`}/>
        </div>
    )
};

export default IndividualTweet;