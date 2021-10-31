import React from 'react';

const SearchButton = ({searchInput, setSearchInput}) => {

    // const submitSearchHandler = (e) => {
    //     // console.log(typeof(searchInput));
    //     // if(searchInput === "") {
    //     //     return `/search`;
    //     // } else {
            
    //     // }
    //     //e.preventDefault();
    //     //Send Tweet to DB/Twitter
    //     //setTweetsList([
    //     //    ...tweetsList, 
    //     //    { user: "Nathan Grove", tweet_content: tweetInput, in_reply_to: null, id: Math.random() * 1000 },
    //     //]);
    //     //setTweetInput("");
        
    // };

    
    //<button onClick={submitSearchHandler} type="submit" className="create-search-button">Search</button>
    return (
        <button className = "search-button" type="submit"><i className="fas fa-search"></i></button>
        //<button onClick={submitSearchHandler} className="search-button">Search</button>
        //<form className="search">
        //    <textarea onChange={searchInputHandler} className="search-box" type="text" placeholder="Search"></input>
        //</div>
        // <button onClick={submitSearchHandler} type="submit" className="create-search-button">Tweet</button>
    )
};

export default SearchButton;