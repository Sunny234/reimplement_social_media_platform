import React from 'react'
import LoginButton from './components/LoginButton'
import logo from './images/rambler.png';

const Login = () => {

    return (
        <div className="login-container">
            <img src={logo} alt="Rambler" className="login-logo"></img>
            <LoginButton/>
        </div>
    )
};

export default Login;
