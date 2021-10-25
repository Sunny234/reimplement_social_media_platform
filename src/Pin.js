import React, { useRef } from 'react'

const PIN = () => {
    
    const pinDigit1Ref = useRef();
    const pinDigit2Ref = useRef();
    const pinDigit3Ref = useRef();
    const pinDigit4Ref = useRef();
    const pinDigit5Ref = useRef();
    const pinDigit6Ref = useRef();
    const pinDigit7Ref = useRef();
    const pinDigitsRef = [pinDigit1Ref, pinDigit2Ref, pinDigit3Ref, pinDigit4Ref, pinDigit5Ref, pinDigit6Ref, pinDigit7Ref];
    
    const combinePin = (e) => {
        e.preventDefault();
        let pin = "";
        for(let x in pinDigitsRef) {
            pin += pinDigitsRef[x].current.value;
        }
        submitPinHandler(pin);
    };

    const submitPinHandler = (pin) => {
        const axios = require('axios');
        const data = pin;

        const config = {
            method: 'post',
            url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/GetPIN',
            headers: { 
                'Content-Type': 'text/plain'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    };
    
    return (
        <div className="pin-container">
            <form>
                <div className="pin-button-container">
                    <input ref={pinDigit1Ref} maxLength="1" className="pin-box" type="text" placeholder="0"></input>
                    <input ref={pinDigit2Ref} maxLength="1" className="pin-box" type="text" placeholder="0"></input>
                    <input ref={pinDigit3Ref} maxLength="1" className="pin-box" type="text" placeholder="0"></input>
                    <input ref={pinDigit4Ref} maxLength="1" className="pin-box" type="text" placeholder="0"></input>
                    <input ref={pinDigit5Ref} maxLength="1" className="pin-box" type="text" placeholder="0"></input>
                    <input ref={pinDigit6Ref} maxLength="1" className="pin-box" type="text" placeholder="0"></input>
                    <input ref={pinDigit7Ref} maxLength="1" className="pin-box" type="text" placeholder="0"></input>
                    <button onClick={combinePin} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
};


export default PIN;
