import React from 'react'
import signInButton from "../images/sign-in-with-twitter-gray.png.twimg.2560.png"

const LoginButton=()=> {

    const loginUser = () => {
        const axios = require('axios');
        const data = '';

        const config = {
        method: 'get',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/Login',
        headers: { },
        data : data
        };

        axios(config)
        .then(function (response) {
            window.open(response.data, '_blank').focus();
            window.location.href="/pin";
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <button onClick={loginUser} href="/pin" className="login-button"><img src={signInButton} alt="Sign into Twitter"/></button>
    )
};

export default LoginButton;