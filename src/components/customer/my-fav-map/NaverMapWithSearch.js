import React, { useEffect, useState } from 'react';

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

const NaverMapWithSearch = () => {
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        const ncpClientId = process.env.REACT_APP_YOUR_CLIENT_ID;
        if (ncpClientId) {
            const scriptUrl = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}&submodules=geocoder`;
            loadScript(scriptUrl)
                .then(() => {
                    if (window.naver && window.naver.maps) {
                        initMap();
                    } else {
                        console.error('Naver Maps API is not loaded properly');
                    }
                })
                .catch((error) => {
                    console.error('Failed to load Naver Map script', error);
                });
        } else {
            console.error('Client ID가 설정되지 않았습니다.');
        }
    }, []);

    const initMap = () => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(37.5564397859151 , 126.945190775648),
            zoom: 15,
            mapTypeControl: true,
        };

        const mapInstance = new window.naver.maps.Map('map', mapOptions);
        setMap(mapInstance);

        const infoWindowInstance = new window.naver.maps.InfoWindow({
            anchorSkew: true,
        });
        setInfoWindow(infoWindowInstance);

        mapInstance.setCursor('pointer');
        mapInstance.addListener('click', function (e) {
            searchCoordinateToAddress(e.coord);
        });

        // 기본 검색어로 초기화
        searchAddressToCoordinate('신촌로 176');
    };

    const searchCoordinateToAddress = (latlng) => {
        if (!window.naver.maps.Service) {
            console.error('Naver Maps Service is not initialized');
            return;
        }

        infoWindow.close();

        window.naver.maps.Service.reverseGeocode(
            {
                coords: latlng,
                orders: [window.naver.maps.Service.OrderType.ADDR, window.naver.maps.Service.OrderType.ROAD_ADDR].join(','),
            },
            function (status, response) {
                if (status === window.naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                const items = response.v2.results;
                let address = '';
                const htmlAddresses = [];

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    address = makeAddress(item) || '';
                    const addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

                    htmlAddresses.push(`${i + 1}. ${addrType} ${address}`);
                }

                infoWindow.setContent([
                    '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                    htmlAddresses.join('<br />'),
                    '</div>',
                ].join('\n'));

                infoWindow.open(map, latlng);
            }
        );
    };

    const searchAddressToCoordinate = (address) => {
        if (!window.naver.maps.Service) {
            console.error('Naver Maps Service is not initialized');
            return;
        }

        window.naver.maps.Service.geocode(
            {
                query: address,
            },
            function (status, response) {
                if (status === window.naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                if (response.v2.meta.totalCount === 0) {
                    return alert('검색 결과가 없습니다.');
                }

                const item = response.v2.addresses[0];
                const point = new window.naver.maps.Point(item.x, item.y);

                const htmlAddresses = [];
                if (item.roadAddress) {
                    htmlAddresses.push(`[도로명 주소] ${item.roadAddress}`);
                }
                if (item.jibunAddress) {
                    htmlAddresses.push(`[지번 주소] ${item.jibunAddress}`);
                }
                if (item.englishAddress) {
                    htmlAddresses.push(`[영문 주소] ${item.englishAddress}`);
                }

                infoWindow.setContent([
                    '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    `<h4 style="margin-top:5px;">검색 주소 : ${address}</h4><br />`,
                    htmlAddresses.join('<br />'),
                    '</div>',
                ].join('\n'));

                map.setCenter(point);
                infoWindow.open(map, point);
            }
        );
    };

    const makeAddress = (item) => {
        if (!item) {
            return '';
        }

        const name = item.name;
        const region = item.region;
        const land = item.land;
        const isRoadAddress = name === 'roadaddr';

        let sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

        if (hasArea(region.area1)) {
            sido = region.area1.name;
        }
        if (hasArea(region.area2)) {
            sigugun = region.area2.name;
        }
        if (hasArea(region.area3)) {
            dongmyun = region.area3.name;
        }
        if (hasArea(region.area4)) {
            ri = region.area4.name;
        }

        if (land) {
            if (hasData(land.number1)) {
                if (hasData(land.type) && land.type === '2') {
                    rest += '산';
                }
                rest += land.number1;

                if (hasData(land.number2)) {
                    rest += `-${land.number2}`;
                }
            }

            if (isRoadAddress === true) {
                if (checkLastString(dongmyun, '면')) {
                    ri = land.name;
                } else {
                    dongmyun = land.name;
                    ri = '';
                }

                if (hasAddition(land.addition0)) {
                    rest += ` ${land.addition0.value}`;
                }
            }
        }

        return [sido, sigugun, dongmyun, ri, rest].join(' ');
    };

    const hasArea = (area) => !!(area && area.name && area.name !== '');
    const hasData = (data) => !!(data && data !== '');
    const checkLastString = (word, lastString) => new RegExp(lastString + '$').test(word);
    const hasAddition = (addition) => !!(addition && addition.value);

    return (
        <div>
            <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search address"
            />
            <button onClick={() => searchAddressToCoordinate(searchKeyword)}>Search</button>
            <div id="map" style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default NaverMapWithSearch;
