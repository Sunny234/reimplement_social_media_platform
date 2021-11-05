import React from 'react';
import SearchButton from './SearchButton';
import { Link } from 'react-router-dom';

const Search = ({searchInput, setSearchInput}) => {
    
    //Updates State of searchInput to be in line with what the searchbox has in it
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    //Directs user to search results page
    const searchInputHandler = (e) => {
        if(searchInput !== "") {
            return `/search/${searchInput}`;
        } else {
            return "/search";
        }
    };

    return (
        <div className="search">
            <input onChange={handleSearchInput} className="search-box" placeholder="Search..." type="text"></input>
            <Link to = {searchInputHandler}><SearchButton searchInput = {searchInput} setSearchInput = {setSearchInput}/></Link>
        </div>
    );
};

export default Search;