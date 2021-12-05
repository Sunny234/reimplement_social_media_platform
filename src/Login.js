import React from 'react'
import LoginButton from './components/LoginButton'
import { useHistory } from 'react-router-dom';

const Login = () => {

    //Clears the sessionStorage in case User just signed out
    window.sessionStorage.clear();
    const history = useHistory();

    return (
        <div className="login-container">
            <span>
                <h4>R</h4><i className="fas fa-dove fa-3x" style={{color: "#FF6C00"}}></i><h4>mbler</h4>
            </span>
            <LoginButton history={history} push={history.push}/>
        </div>
    );
};

export default Login;
