import React from 'react';
import CreateTweet from './CreateTweet';
import Feed from "./Feed";

const Home = () => {
    return (
        <div class="main-home">
            <Feed/>
            <CreateTweet/>
        </div>
    )
};

export default Home;
