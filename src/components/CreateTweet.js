import React from 'react'

const CreateTweet = ({ tweetInput, setTweetInput, tweetsList, setTweetsList }) => {

    const tweetInputHandler = (e) => {
        setTweetInput(e.target.value);
    };

    const submitTweetHandler = (e) => {
        e.preventDefault();
        //Send Tweet to DB/Twitter
        setTweetsList([
            ...tweetsList,
            { user: "Nathan Grove", tweet_content: tweetInput, in_reply_to: null, retweeted: undefined, id: Math.random() * 1000 },
        ]);
        setTweetInput("");
    };

    return (
        <form className="create-tweet">
            <textarea onChange={tweetInputHandler} className="create-tweet-text" placeholder="Tell your story..." type="text" value={tweetInput}></textarea>
            <button onClick={submitTweetHandler} type="submit" className="create-tweet-button">Tweet</button>
        </form>
    )
};

export default CreateTweet;