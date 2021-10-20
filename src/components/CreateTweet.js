import React from 'react'

function postTweet(e) {
    e.preventDefault();
    console.log("adf");
}

const CreateTweet = () => {
    return (
        <form className="create-tweet" onSubmit={postTweet}>
            <textarea className="create-tweet-text" placeholder="Write something..." type="text"></textarea>
            <button onClick={postTweet} type="submit" className="create-tweet-button">Tweet</button>
        </form>
    )
}

export default CreateTweet
