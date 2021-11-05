import React from 'react';
import signInButton from "../images/sign-in-with-twitter-gray.png.twimg.2560.png";

const LoginButton=()=> {

    //Sends request to backend to get the authorization link
    const loginUser = () => {
        const axios = require('axios');

        const config = {
        method: 'post',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/Login2',
        headers: { },
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            //Opens new tab for Authorization code
            window.open(response.data["URL"], '_blank').focus();
            //Stores session ID for requests to backend
            window.sessionStorage.setItem('id', response.data["ID"]);
            //Redirects user to input their pin
            window.location.href="/pin";
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <button onClick={loginUser} href="/pin" className="login-button"><img src={signInButton} alt="Sign into Twitter"/></button>
    );
};

export default LoginButton;