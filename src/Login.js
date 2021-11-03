import React from 'react'
import LoginButton from './components/LoginButton'

const Login = () => {

    window.sessionStorage.clear();

    return (
        <div className="login-container">
            <span>
                <h4>R</h4><i className="fas fa-dove fa-3x" style={{color: "#FF6C00"}}></i><h4>mbler</h4>
            </span>
            <LoginButton/>
        </div>
    )
};

export default Login;
