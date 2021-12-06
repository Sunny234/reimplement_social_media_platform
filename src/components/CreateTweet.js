import React, { useRef, useState } from 'react';

const CreateTweet = ({ tweetInput, setTweetInput, styles, updated, setUpdated, replyID }) => {

    //State/Ref used for word count
    const [wordCount, setWordCount] = useState("0");
    const [characterCount, setCharacterCount] = useState("0");
    const textRef = useRef("");

    //Function gets what is in the <textarea> and makes an array of all the words that are seperated by spaces
    const getWords = () => {
        let arr = String(textRef.current.value).split(" ");
        return arr.length - 1;
    };

    const getCharacterCount = () => {
        return textRef.current.value.length;
    }

    //Updates State when User types
    const tweetInputHandler = (e) => {
        console.log(e.target.value);
        setTweetInput(e.target.value);
        console.log(tweetInput);
        setWordCount(getWords());
        setCharacterCount(getCharacterCount());
    };

    //When user submits a Tweet to be posted, makes the request to backend
    const submitTweetHandler = (e) => {
        e.preventDefault();
        const axios = require('axios');
        let data = {}
        console.log(tweetInput);
        if (replyID != null)
        {
            data =  {"message": tweetInput, "access_token": window.sessionStorage.getItem("access_token"), "access_token_secret": window.sessionStorage.getItem("access_secret"), "is_reply": "True", "reply_ID": replyID};
        }
        else
        {
            data =  {"message": tweetInput, "access_token": window.sessionStorage.getItem("access_token"), "access_token_secret": window.sessionStorage.getItem("access_secret"), "is_reply": "False", "reply_ID": "0"};
        }
        

        const config = {
        method: 'post',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/PostTweet',
        headers: { 'Content-Type': 'text/plain'},
        data: data,
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            //Resets the textarea and word count
            setTweetInput("");
            setWordCount("0");
            setCharacterCount("0");
            setUpdated(updated + 1);
        })
        .catch(function (error) {
            alert(error.response.status + ": " + error.response.data["message"]);
        });
    };

    //Used to know which style to apply to the textarea, whether it's on the viewing individual tweet page or the main timeline
    const renderThis = () => {
        if(styles === "reply") {
            return (
                <form className="reply-tweet">
                    <textarea ref={textRef} onChange={tweetInputHandler} className="create-tweet-text" placeholder="Say your side..." type="text" value={tweetInput}></textarea>
                    <span className="create-tweet-footer">
                    <h1>{wordCount} | {characterCount}</h1>
                    <button onClick={submitTweetHandler} type="submit" className="create-tweet-button">Tweet</button>
                    </span>
                </form>
            );
        } else {
            return (
                <form className="create-tweet">
                    <textarea ref={textRef} onChange={tweetInputHandler} className="create-tweet-text" placeholder="Tell your story..." type="text" value={tweetInput}></textarea>
                    <span className="create-tweet-footer">
                    <h1>{wordCount} | {characterCount}</h1>
                    <button onClick={submitTweetHandler} type="submit" className="create-tweet-button">Tweet</button>
                    </span>
                </form>
            );
        }
    };

    return renderThis();
};

export default CreateTweet;