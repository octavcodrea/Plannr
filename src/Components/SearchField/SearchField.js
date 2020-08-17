import React from 'react';
import "./SearchField.css";

const handleClick = () =>{
    console.log("[SearchField] clicked");
}

const SearchField = () =>{

    return(
        <div>
            <input className="searchField" onClick={handleClick}></input>
        </div>
    )
}

export default SearchField;