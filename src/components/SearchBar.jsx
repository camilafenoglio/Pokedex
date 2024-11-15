import React from 'react';

function SearchBar({ searchTerm, handleSearch }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for a Pokémon..."
            />
        </div>
    );
}

export default SearchBar;
