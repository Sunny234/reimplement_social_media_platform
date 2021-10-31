import React from 'react'
import {Link} from 'react-router-dom';


const SignOutButton = ({text, URL}) => {
    return (
        <Link to={URL} className="sign-out-button">{text}</Link>
    )
};

export default SignOutButton;