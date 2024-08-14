import React from 'react';
import {useLocation, useParams, useSearchParams} from "react-router-dom";

const Search = () => {
    const [word,setWord] = useSearchParams();
    console.log(word.get('q'))
    return (
        <div>
            hi search keyword = {word.get('q')}
        </div>
    );
};

export default Search;