import React from 'react'
import SidebarButton from './SidebarButton'

const LoginButton = () => {
    return (
        <div className="login-button-text">
            <SidebarButton text="Login with Twitter" URL="/home"/>
        </div>
    )
}

export default LoginButton


