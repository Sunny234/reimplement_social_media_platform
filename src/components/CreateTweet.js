import React from 'react'

const CreateTweet = ({ tweetInput, setTweetInput, tweetsList, setTweetsList, styles }) => {

    const tweetInputHandler = (e) => {
        setTweetInput(e.target.value);
    };

    const submitTweetHandler = () => {
        const axios = require('axios');

        const config = {
        method: 'post',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/PostTweet',
        headers: { 'Content-Type': 'text/plain'},
        data: tweetInput
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const renderThis = () => {
        if(styles === "reply") {
            return (
                <form className="reply-tweet">
                    <textarea onChange={tweetInputHandler} className="create-tweet-text" placeholder="Placerholder Tweet Reply..." type="text" value={tweetInput}></textarea>
                    <button onClick={submitTweetHandler} type="submit" className="create-tweet-button">Tweet</button>
                </form>
            )
        } else {
            return (
                <form className="create-tweet">
                    <textarea onChange={tweetInputHandler} className="create-tweet-text" placeholder="Tell your story..." type="text" value={tweetInput}></textarea>
                    <button onClick={submitTweetHandler} type="submit" className="create-tweet-button">Tweet</button>
                </form>
            )
        }
    }

    return renderThis();
};

export default CreateTweet;