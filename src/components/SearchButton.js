import React from 'react';

const SearchButton = ({searchInput, setSearchInput}) => {

    return (
        <button className = "search-button" type="submit"><i className="fas fa-search"></i></button>
    );
};

export default SearchButton;