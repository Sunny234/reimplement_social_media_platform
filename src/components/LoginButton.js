import React from 'react'
import signInButton from "../sign-in-with-twitter-gray.png.twimg.2560.png"

const LoginButton = () => {
    return (
        <div className="login-button">
            <a href="/home"><img src={signInButton} alt="Sign into Twitter"/></a>
        </div>
    )
}

export default LoginButton