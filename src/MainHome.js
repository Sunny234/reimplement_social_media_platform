import React from 'react'
import Search from './componets/Search'
import Sidebar from './componets/Sidebar'
import Home from './componets/Home'

const MainHome = () => {
    return (
        <div className="main-container">
            <Search/>
            <Sidebar/>
            <Home/>
        </div>
    )
}

export default MainHome

            