import React from 'react'
import SearchButton from './SearchButton'

const Search = ({searchInput, setSearchInput}) => {
    
    const searchInputHandler = (e) => {
        if(e.target.value !== "") {
            setSearchInput(e.target.value);
        }
    };

    
    //<button onClick={submitSearchHandler} type="submit" className="create-search-button">Search</button>
    return (
        <form className="search">
            <input onSubmit={searchInputHandler} className="search-box" placeholder="Search..." type="text" value={searchInput}></input>
            <SearchButton searchInput = {searchInput} setSearchInput = {setSearchInput}/>
        </form>
        //<form className="search">
        //    <textarea onChange={searchInputHandler} className="search-box" type="text" placeholder="Search"></input>
        //</div>
        // <button onClick={submitSearchHandler} type="submit" className="create-search-button">Tweet</button>
    )
};

export default Search;