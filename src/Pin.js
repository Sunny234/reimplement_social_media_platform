import React from 'react';

const PIN = () => {

    const submitPinHandler = (e) => {
        e.preventDefault();
        if(e.target.value.length === 7) {
            const axios = require('axios');
            const data = e.target.value;
            const config = {
                method: 'post',
                url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/GetPIN/',
                headers: { 
                    'Content-Type': 'text/plain',
                }, 
                data: data,
            };

            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            alert(error);
            });
        }
    };
    window.sessionStorage.setItem('token', '34234112341234');
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
