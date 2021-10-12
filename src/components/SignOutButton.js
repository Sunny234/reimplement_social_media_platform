import React from 'react'

const SignOutButton = ({text, URL}) => {
    return (
        <a className="sign-out-button" href={URL}>{text}</a>
    )
}

export default SignOutButton
