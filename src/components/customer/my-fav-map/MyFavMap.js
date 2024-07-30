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
    useEffect(() => {
        const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID; //env 파일에 키 추가
        if (clientId) {
            const scriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
            loadScript(scriptUrl)
                .then(() => {
                    console.log('Naver Map script loaded successfully');

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const { latitude, longitude } = position.coords;
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
    }, []);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default MyFavMap;