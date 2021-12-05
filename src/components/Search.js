import React from 'react';
import SearchButton from './SearchButton';
import { Link } from 'react-router-dom';

const Search = ({searchInput, setSearchInput}) => {
    
    let tempSearch = searchInput;

    //Updates State of searchInput to be in line with what the searchbox has in it
    const handleSearchInput = (e) => {
        tempSearch = e.target.value;
    }

    //Directs user to search results page
    const searchInputHandler = () => {
        if(tempSearch !== "") {
            setSearchInput(tempSearch);
            return `/search/${tempSearch}`;
        } else {
            return "/search";
        }
    };

    return (
        <div className="search">
            <input onChange={handleSearchInput} className="search-box" placeholder="Search..." type="text"></input>
            <Link to = {searchInputHandler}><SearchButton/></Link>
        </div>
    );
};

export default Search;