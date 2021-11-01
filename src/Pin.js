import React from 'react';

const PIN = () => {

    const submitPinHandler = (e) => {
        e.preventDefault();
        console.log(typeof(e.target.value));
        console.log((typeof(window.sessionStorage.getItem("id"))));
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
            })
            .catch(function (error) {
            alert(error);
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
