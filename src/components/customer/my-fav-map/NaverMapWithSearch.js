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
    const [places, setPlaces] = useState([]);
    const [searchMarker, setSearchMarker] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    initializeMap(latitude, longitude);
                },
                () => {
                    initializeMap(37.555183, 126.936883); // 중앙정보처리학원 신촌로176
                }
            );
        } else {
            initializeMap(37.555183, 126.936883); // Geolocation을 지원하지 않는 경우
        }
    };

    const initializeMap = (lat, lng) => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(lat, lng),
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
            if (infoWindowInstance.getMap()) {
                infoWindowInstance.close();
            }
            if (places.length < 3) {
                addPlace(e.coord);
            } else {
                alert('최대 3개의 장소만 저장할 수 있습니다.');
            }
        });

        // 더미 데이터로 시작하는 장소
        const dummyPlaces = [
            { id: 1, title: '집', latlng: new window.naver.maps.LatLng(37.554722, 126.970833), roadAddress: '서울특별시 용산구 남산공원길 105', jibunAddress: '서울특별시 용산구 용산동2가 산1-3' },
            { id: 2, title: '회사', latlng: new window.naver.maps.LatLng(37.566535, 126.977969), roadAddress: '서울특별시 중구 세종대로 110', jibunAddress: '서울특별시 중구 태평로1가 1-1' },
            { id: 3, title: '학교', latlng: new window.naver.maps.LatLng(37.579617, 126.977041), roadAddress: '서울특별시 종로구 세종대로 1', jibunAddress: '서울특별시 종로구 세종로 1-68' }
        ];
        setPlaces(dummyPlaces);
        dummyPlaces.forEach(place => {
            addMarker(place, mapInstance, infoWindowInstance, 'blue');
        });
    };

    const addPlace = (latlng, alias = `장소 ${places.length + 1}`, roadAddress, jibunAddress) => {
        const newPlace = { id: places.length + 1, title: alias, latlng: latlng, roadAddress, jibunAddress };
        setPlaces(prevPlaces => {
            const updatedPlaces = [...prevPlaces, newPlace];
            addMarker(newPlace, map, infoWindow, 'blue');
            return updatedPlaces;
        });
    };

    const addMarker = (place, mapInstance, infoWindowInstance, color = 'blue') => {
        const markerOptions = {
            position: place.latlng,
            map: mapInstance,
            title: place.title,
            icon: {
                content: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                anchor: new window.naver.maps.Point(10, 10)
            }
        };

        const marker = new window.naver.maps.Marker(markerOptions);

        window.naver.maps.Event.addListener(marker, 'click', () => {
            if (infoWindowInstance.getMap()) {
                infoWindowInstance.close();
            }
            setActiveMarker(marker);
            infoWindowInstance.setContent([
                '<div style="padding:10px;min-width:200px;line-height:150%;">',
                `<h4 style="margin-top:5px;">${place.title}</h4>`,
                place.roadAddress ? `<p>[도로명 주소] ${place.roadAddress}</p>` : '',
                place.jibunAddress ? `<p>[지번 주소] ${place.jibunAddress}</p>` : '',
                `<button onclick="document.getElementById('removeFav').click()">선호 지역에서 제거하기</button>`,
                '</div>',
            ].join('\n'));
            infoWindowInstance.open(mapInstance, marker);
        });
    };

    const searchAddressToCoordinate = (address) => {
        if (!window.naver.maps.Service || !infoWindow) {
            console.error('Naver Maps Service or InfoWindow is not initialized');
            return;
        }

        window.naver.maps.Service.geocode(
            { query: address },
            function (status, response) {
                if (status === window.naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                if (response.v2.meta.totalCount === 0) {
                    return alert('검색 결과가 없습니다.');
                }

                const item = response.v2.addresses[0];
                const point = new window.naver.maps.Point(item.x, item.y);
                const latlng = new window.naver.maps.LatLng(item.y, item.x);

                if (searchMarker) {
                    searchMarker.setMap(null);
                }

                const markerOptions = {
                    position: latlng,
                    map: map,
                    title: address,
                    icon: {
                        content: `<div style="background-color: #e87a7a; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                        anchor: new window.naver.maps.Point(10, 10)
                    }
                };

                const newSearchMarker = new window.naver.maps.Marker(markerOptions);
                setSearchMarker(newSearchMarker);

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
                    `<input type="text" id="aliasInput" placeholder="별칭 입력" style="margin-top:10px;" />`,
                    `<button onclick="document.getElementById('addFav').click()">선호 지역으로 추가하기</button>`,
                    '</div>',
                ].join('\n'));

                map.setCenter(point);
                infoWindow.open(map, newSearchMarker);
            }
        );
    };

    const addSearchMarkerToFavorite = () => {
        if (searchMarker) {
            const aliasInput = document.getElementById('aliasInput');
            const aliasValue = aliasInput ? aliasInput.value : `장소 ${places.length + 1}`;
            const roadAddress = document.querySelector('.roadAddress')?.textContent || '';
            const jibunAddress = document.querySelector('.jibunAddress')?.textContent || '';
            addPlace(searchMarker.getPosition(), aliasValue, roadAddress, jibunAddress);
            searchMarker.setMap(null);
            setSearchMarker(null);
            if (infoWindow.getMap()) {
                infoWindow.close();
            }
        }
    };

    const removePlaceFromFavorites = (marker) => {
        if (marker) {
            const placeToRemove = places.find(place => place.latlng.equals(marker.getPosition()));
            if (placeToRemove) {
                setPlaces(prevPlaces => prevPlaces.filter(place => place !== placeToRemove));
                marker.setMap(null);
                if (infoWindow.getMap()) {
                    infoWindow.close();
                }
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="주소 검색"
            />
            <button onClick={() => searchAddressToCoordinate(searchKeyword)}>검색</button>
            <button id="addFav" style={{ display: 'none' }} onClick={addSearchMarkerToFavorite}>선호 지역으로 추가하기</button>
            <button id="removeFav" style={{ display: 'none' }} onClick={() => removePlaceFromFavorites(activeMarker)}>선호 지역에서 제거하기</button>
            <div id="map" style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default NaverMapWithSearch;
