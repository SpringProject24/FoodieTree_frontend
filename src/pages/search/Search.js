import React, {useEffect, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import SearchList from "../../components/search/SearchList";
import Skeleton from "../../components/search/Skeleton";

const Search = () => {
    const [word, setWord] = useSearchParams();
    const skeletonRef = useRef();
    const [pageNo, setPageNo] = useState(1);
    const [storeList, setStoreList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [skeletonCnt, setSkeletonCnt] = useState(20);
    const [initLoading, setInitLoading] = useState(true)

    useEffect(() => {
        const initFetch = async () => {
            setInitLoading(true);
            const { result, totalCnt } = await fetchSearch(1);
            setStoreList(result);
            setIsFinish(result.length >= totalCnt);
            setInitLoading(false);
            setPageNo(2);
        };
        initFetch();
    }, [word]);

    useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            if (!entries[0].isIntersecting || loading || isFinish) return;
            await loadSearchedStores();
        }, {rootMargin: '-200px', threshold: 0.9});

        if (skeletonRef.current) observer.observe(skeletonRef.current);
        return () => {
            if (skeletonRef.current) observer.disconnect();
        }
    }, [loading, pageNo]);

    const loadSearchedStores = async () => {
        if (isFinish || loading || initLoading) return;

        setLoading(true);
        const {result: loadedList, totalCnt} = await fetchSearch(pageNo);
        console.log(loadedList)
        const updatedList = [...storeList, ...loadedList];
        setStoreList(updatedList);
        setPageNo(prev => prev + 1);
        setIsFinish(totalCnt === updatedList.length);
        setLoading(false);

        const restListLen = totalCnt - updatedList.length;
        const skeletonCnt = Math.min(20, restListLen);
        setSkeletonCnt(skeletonCnt);
    };

    const fetchSearch = async (pageNo) => {
        const response = await fetch(`/search?pageNo=${pageNo}&keyword=${word.get('q')}`);
        if (!response.ok) {
            console.error("잠시 후 다시 이용해주세요");
            return;
        }
        return await response.json();
    }

    return (
        <div>
            {initLoading && <Skeleton count={skeletonCnt} init={true}/>}
            {!initLoading &&
                <>
                    <SearchList stores={storeList}/>
                    <div ref={skeletonRef}>
                        {loading && <Skeleton count={skeletonCnt}/>}
                    </div>
                </>
            }
        </div>
    );
};

export default Search;