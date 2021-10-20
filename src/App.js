import React from 'react';
import "./App.css"
import Login from "./Login"
import Profile from "./Profile"
import MainHome from "./MainHome"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/home" component={MainHome}/>
                    <Route exact path="/profile" component={Profile}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
