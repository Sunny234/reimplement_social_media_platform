import React from 'react';
import "./App.css"
import Login from "./Login"
import Profile from "./Profile"
import MainHome from "./MainHome"
import Pin from "./Pin"
import IndividualTweet from "./IndividualTweet"
import SearchResults from "./SearchResults"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/home" component={MainHome}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/pin" component={Pin}/>
                    <Route exact path="/search" component={SearchResults}/>
                    <Route path="/search/:searchTerm" component={SearchResults}/>
                    <Route path="/:id" component={IndividualTweet}/>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
