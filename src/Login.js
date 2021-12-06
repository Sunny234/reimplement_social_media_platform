import React from 'react'
import LoginButton from './components/LoginButton'
import { useHistory } from 'react-router-dom';
import logo from './images/ranter.png';

const Login = () => {

    //Clears the sessionStorage in case User just signed out
    window.sessionStorage.clear();
    const history = useHistory();

    return (
        <div className="login-container">
            <span>
                <img src={logo} className="logo"></img>
                <h3 color="orange" className="name">Ranter</h3>
            </span>
            <LoginButton history={history} push={history.push}/>
        </div>
    );
};

export default Login;
