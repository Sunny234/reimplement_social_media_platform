import React from 'react'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import IndividualTweetMain from './components/IndividualTweetMain'
import CreateTweet from './components/CreateTweet'

const IndividualTweet = () => {
    return (
        <div className="main-container">
            <Search/>
            <Sidebar/>
            <IndividualTweetMain/>
            <CreateTweet/>
        </div>
    )
};

export default IndividualTweet;