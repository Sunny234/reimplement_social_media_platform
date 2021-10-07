import React from 'react';
import "./App.css"
import Login from "./Login"
import Profile from "./Profile"
import MainHome from "./MainHome"
import {Route, Link} from "react-router-dom"

const App = () => {
    return (
        <div>
            <Route exact path="/" component={Login}/>
            <Route exact path="/home" component={MainHome}/>
            <Route exact path="/profile" component={Profile}/>
        </div>
    );
}

export default App;
