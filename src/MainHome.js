import React from 'react'
import Search from './componets/Search'
import Sidebar from './componets/Sidebar'
import Feed from './componets/Feed'
import CreateTweet from './componets/CreateTweet'

const MainHome = () => {
    return (
        <div className="main-container">
            <Search/>
            <Sidebar/>
            <Feed/>
            <CreateTweet/>
        </div>
    )
}

export default MainHome

            