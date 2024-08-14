import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";

const SearchInput = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const onClickHandler = () => {
        navigate(`/search?q=${inputRef.current.value}`)
    }
    const onKeyHandler = (e) => {
        if (e.keyCode === 13) {
            onClickHandler();
        }
    }
    return (
        <div>
            <input ref={inputRef} type="text" onKeyUp={onKeyHandler}/>
            <button onClick={onClickHandler}>검색</button>
        </div>
    );
};

export default SearchInput;