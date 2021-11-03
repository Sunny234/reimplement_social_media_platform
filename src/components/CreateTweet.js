import React, { useRef, useState } from 'react'

const CreateTweet = ({ tweetInput, setTweetInput, tweetsList, setTweetsList, styles }) => {

    const [wordCount, setWordCount] = useState("0");
    const textRef = useRef();

    const getWords = () => {
        let arr = String(textRef.current.value).split(" ");
        return arr.length - 1;
    };

    const tweetInputHandler = (e) => {
        setTweetInput(e.target.value);
        setWordCount(getWords());
    };

    const submitTweetHandler = (e) => {
        e.preventDefault();
        const axios = require('axios');
        const data =  {"message": tweetInput, "access_token": window.sessionStorage.getItem("access_token"), "access_token_secret": window.sessionStorage.getItem("access_secret")};

        const config = {
        method: 'post',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/PostTweet',
        headers: { 'Content-Type': 'text/plain'},
        data: data,
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setTweetInput("");
            setWordCount("0");
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const renderThis = () => {
        if(styles === "reply") {
            return (
                <form className="reply-tweet">
                    <textarea onChange={tweetInputHandler} className="create-tweet-text" placeholder="Say your side..." type="text" value={tweetInput}></textarea>
                    <span className="create-tweet-footer">
                    <h1>{wordCount}</h1>
                    <button onClick={submitTweetHandler} type="submit" className="create-tweet-button">Tweet</button>
                    </span>
                </form>
            )
        } else {
            return (
                <form className="create-tweet">
                    <textarea ref={textRef} onChange={tweetInputHandler} className="create-tweet-text" placeholder="Tell your story..." type="text" value={tweetInput}></textarea>
                    <span className="create-tweet-footer">
                    <h1>{wordCount}</h1>
                    <button onClick={submitTweetHandler} type="submit" className="create-tweet-button">Tweet</button>
                    </span>
                </form>
            )
        }
    }

    return renderThis();
};

export default CreateTweet;