import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

const Tweet = ({user, screen_name, profile_image, tweet_content, tweet_image,  in_reply_to, retweeted_user, retweeted_screen_name, retweeted_profile_image, retweeted_text, is_quote_status, favorited, retweeted, retweet_count, favorite_count, id }) => {

    const [rfavorited, setFavorited] = useState([favorited, favorite_count]);
    const [rretweeted, setRetweeted] = useState([retweeted, retweet_count]);

    //Sends User to the Individual Tweet page
    const viewSingleTweetHandler = (e) => {
        return `/tweet/${id}`;
    };

    //Checks whether Tweet has an image
    const hasImage = () => {
        if(tweet_image !== null) {
            return (
                <img src={tweet_image} alt={`${tweet_image}`} className="tweeted_image"/>
            );
        } else {
            return;
        }
    };

    //Checks whether Tweet is a reply to another Tweet
    const isReply = () => {
        if(in_reply_to !== null) {
            return (
                <h2>In reply to {in_reply_to}</h2>
                );
        }
    };

    const renderLike = () => {
        if(rfavorited[0] === true) {
            return (
                <span className="tweet-action-button">
                    <button onClick={likeHandler}>
                        <i style={{color: "orange"}} className="fas fa-heart"></i>
                    </button>
                    <h3> {rfavorited[1]}</h3>
                </span>
                );
        } else {
            return (
                <span className="tweet-action-button">
                    <button onClick={likeHandler}>
                        <i style={{color: "white"}} className="far fa-heart"></i>
                    </button>
                    <h3> {rfavorited[1]}</h3>
                </span>
                );
        }
    }

    const renderRetweet = () => {
        if(rretweeted[0] === true) {
            return (
                <span className="tweet-action-button">
                    <button onClick={retweetHandler}>
                        <i style={{color: "green"}} className="fas fa-retweet"></i>
                    </button>
                    <h3> {rretweeted[1]}</h3>
                </span>
                );
        } else {
            return (
                <span className="tweet-action-button">
                    <button onClick={retweetHandler}>
                        <i className="fas fa-retweet"></i>
                    </button>
                    <h3> {rretweeted[1]}</h3>
                </span>
                );
        }
    }

    //Checks if Tweet was a Retweet of another Tweet and renders the correct information
    const isRetweet = () => {
        if(retweeted_user !== null) {
            return (
                <div className="tweet-container">
                   
                    <h2>{user} Retweeted</h2>
                    {isReply()}
                    <Link to={`/profile/${screen_name}`} className="link">
                    <img src={retweeted_profile_image} alt={retweeted_screen_name} className="tweet-profile-image"></img>
                    </Link>
                    <div className="content-wrapper">
                        <h1>{retweeted_user} <i>@{retweeted_screen_name}</i></h1>
                        <p>{retweeted_text}</p>
                        {hasImage()}

                    </div>

                </div>
            );
        } else {
            return (
                <div className="tweet-container">

                    {isReply()}
                    <Link to={`/profile/${screen_name}`} className="link">
                    <img src={profile_image} alt={screen_name} className="tweet-profile-image"></img>
                    </Link>
                    <h1>{user} <i>@{screen_name}</i></h1>
                    <p>{tweet_content}</p>
                    {hasImage()}

                </div>
            );
        }
    };

    const likeHandler = () => {
        var axios = require('axios');
        let data = {}
        if (rfavorited[0])
            data = {"token": window.sessionStorage.getItem("access_token"), "secret": window.sessionStorage.getItem("access_secret"), "user_id": window.sessionStorage.getItem("user_id"), "status": "unlike", "id": id};
        else
            data = {"token": window.sessionStorage.getItem("access_token"), "secret": window.sessionStorage.getItem("access_secret"), "user_id": window.sessionStorage.getItem("user_id"), "status": "like", "id": id};  
        var config = {
        method: 'post',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/liketweet',
        headers: { 
            'Content-Type': 'text/plain'
        },
        data: data
        }
        axios(config)
        .then(function (response) {
            console.log(response.data)
            if(rfavorited[0] === true) {
                setFavorited([false, rfavorited[1] - 1]);
            } else {
                setFavorited([true, rfavorited[1] + 1]);
            }
        })
        .catch(function (error) {
            alert(error.response.status + ": " + error.response.data["message"]);
        });
    }

    const retweetHandler = () => {
        var axios = require('axios');
        let data = {}
        if (rretweeted[0])
            data = {"token": window.sessionStorage.getItem("access_token"), "secret": window.sessionStorage.getItem("access_secret"), "user_id": window.sessionStorage.getItem("user_id"), "status": "unretweet", "id": id};
        else
            data = {"token": window.sessionStorage.getItem("access_token"), "secret": window.sessionStorage.getItem("access_secret"), "user_id": window.sessionStorage.getItem("user_id"), "status": "retweet", "id": id};  
        var config = {
        method: 'post',
        url: 'https://v0xrcmlje7.execute-api.us-west-1.amazonaws.com/default/retweet',
        headers: { 
            'Content-Type': 'text/plain'
        },
        data: data
        }
        axios(config)
        .then(function (response) {
            console.log(response.data);
            if(rretweeted[0] === true) {
                setRetweeted([false, rretweeted[1] - 1]);
            } else {
                setRetweeted([true, rretweeted[1] + 1]);
            }
        })
        .catch(function (error) {
            alert(error.response.status + ": " + error.response.data["message"]);
        });
    }

    useEffect(()=>{
        renderLike(); renderRetweet();
    },[rfavorited, rretweeted])

    return (
        <div className="tweet-hover">
            <Link to={viewSingleTweetHandler} className="link">
                    <div className="tweet">
                        {isRetweet()}
                    </div>
            </Link>
            <div className="tweet-actions">
                {renderLike()}
                {renderRetweet()}
            </div>
        </div>
    );
};

export default Tweet;
