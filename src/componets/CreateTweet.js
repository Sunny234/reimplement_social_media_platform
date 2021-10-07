import React from 'react'

function postTweet() {
    alert("Post Tweet")
}

const CreateTweet = () => {
    return (
        <div className="create-tweet">
            <textarea className="create-tweet-text" placeholder="Write something..." type="text"></textarea>
            <button onClick={postTweet} className="create-tweet-button">Tweet</button>
        </div>
    )
}

export default CreateTweet
