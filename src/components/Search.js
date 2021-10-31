import React from 'react'
import SearchButton from './SearchButton'
import { Link } from 'react-router-dom';

const Search = ({searchInput, setSearchInput}) => {
    
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const searchInputHandler = (e) => {
        if(searchInput !== "") {
            return `/search/${searchInput}`;
        } else {
            return "/search";
        }
    };

    
    //<button onClick={submitSearchHandler} type="submit" className="create-search-button">Search</button>
    return (
        <div className="search">
            <input onChange={handleSearchInput} className="search-box" placeholder="Search..." type="text"></input>
            <Link to = {searchInputHandler}><SearchButton searchInput = {searchInput} setSearchInput = {setSearchInput}/></Link>
        </div>
        //<form className="search">
        //    <textarea onChange={searchInputHandler} className="search-box" type="text" placeholder="Search"></input>
        //</div>
        // <button onClick={submitSearchHandler} type="submit" className="create-search-button">Tweet</button>
    )
};

export default Search;