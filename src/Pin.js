import React from 'react';
import { useHistory } from 'react-router-dom';

const PIN = () => {
    let navigate = useHistory();
    //Handles pin input
    const submitPinHandler = (e) => {
        e.preventDefault();

        console.log(typeof(e.target.value));
        console.log((typeof(window.sessionStorage.getItem("id"))));
        //Once the input reaches length of 7 try to fetch the tokens
        if(e.target.value.length === 7) {
            const axios = require('axios');
            const data = { "ID": window.sessionStorage.getItem("id"), "PIN": e.target.value};
            console.log(data)
            const new_data = JSON.stringify(data);
            const config = {
                method: 'post',
                url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/GetPIN',
                headers: { 
                    'Content-Type': 'application/json',
                }, 
                data: new_data,
            };

            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            //Stores the token on the frontend
            window.sessionStorage.setItem('access_token', response.data["access_token"]);
            window.sessionStorage.setItem('access_secret', response.data["access_token_secret"]);
            //window.sessionStorage.setItem('user_id', response.data["user_id"]);
            //Redirects to home 
            //window.location.href="/home";
            navigate.push("/home");
            })
            .catch(function (error) {
            alert(error.response.status + ": " + error.response.data["message"]);
            navigate.push("/");
            });
        }
    };

    return (
        <div className="pin-container">
            <form>
                <div className="pin-button-container">
                    <input onChange={submitPinHandler} maxLength="7" className="pin-box" type="text" placeholder="0000000"></input>
                </div>
            </form>
        </div>
    )
};


export default PIN;
