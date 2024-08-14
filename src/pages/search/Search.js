import React, {useEffect, useState} from 'react';
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import CategoryList from "../../components/mainPage/CategoryList";
import SearchList from "../../components/search/SearchList";

const Search = () => {
    const [word, setWord] = useSearchParams();
    const [pageNo, setPageNo] = useState(1);
    const [storeList, setStoreList] = useState([]);
    useEffect(() => {
        (async () => {
            const payload = {
                pageNo,
                keyword: word.get('q')
            }
            const response = await fetch(`/search?pageNo=${pageNo}&keyword=${word.get('q')}`);
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setStoreList(data.result);
            } else {
                alert("잠시 후 다시 이용해주세요.");
            }
        })();
    }, [word]);
    return (
        <div>
            <SearchList stores={storeList}/>
        </div>
    );
};

export default Search;