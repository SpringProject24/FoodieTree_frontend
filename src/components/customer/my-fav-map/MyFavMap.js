import React, { useEffect } from 'react';

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

const MyFavMap = () => {
    // useEffect(() => {
    //     const ncpClientId = process.env.REACT_APP_YOUR_CLIENT_ID; //env 파일에 클라이언트 아이디 추가
    const ncpClientId = "4p0oi89cry"; // env 값 안불러와짐
        if (ncpClientId) {
            const scriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
            loadScript(scriptUrl)
                .then(() => {
                    console.log('Naver Map script loaded successfully');

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const {latitude, longitude} = position.coords;
                                const mapOptions = {
                                    center: new window.naver.maps.LatLng(latitude, longitude),
                                    zoom: 10,
                                };

                                const map = new window.naver.maps.Map('map', mapOptions);
                                const marker = new window.naver.maps.Marker({
                                    position: new window.naver.maps.LatLng(latitude, longitude),
                                    map: map,
                                });
                            },
                            (error) => {
                                console.error('Error getting geolocation', error);
                            }
                        );
                    } else {
                        console.error('Geolocation not supported');
                    }
                })
                .catch((error) => {
                    console.error('Failed to load Naver Map script', error);
                });
        }
        else {
            console.error('client id가 false래요');
        }
    // }, []);

    return <div id="map" style={{width: '100%', height: '400px'}}/>;
};

export default MyFavMap;