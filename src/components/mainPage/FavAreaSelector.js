import React, { useEffect, useState } from 'react';
import { getUserEmail, getToken, getRefreshToken } from '../../utils/authUtil';
import { FAVORITESTORE_URL } from '../../config/host-config';
import { getCurrentLocation, reverseGeocode } from '../../utils/locationUtil';
import styles from './FavAreaSelector.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// "구" 단위까지 자르는 함수
const extractGu = (address) => {
  const match = address.match(/^[^\d]*[가-힣]+구/);
  return match ? match[0] : address;
};

const FavAreaSelector = ({ onAreaSelect }) => {
  const [areas, setAreas] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const id = await getUserEmail();
        setCustomerId(id);
      } catch (error) {
        console.error('Error fetching customer ID:', error);
      }
    };

    fetchCustomerId();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${FAVORITESTORE_URL}/areas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'refreshToken': getRefreshToken(),
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        setAreas(data);

        if (data.length > 0) {
          const defaultArea = extractGu(data[0].preferredArea);
          setSelectedArea(defaultArea);
          sessionStorage.setItem('selectedArea', defaultArea);
          console.log('Default area saved to sessionStorage:', defaultArea);
        } else {
          // 사용자가 favArea에 아무것도 저장하지 않은 경우 현재 위치를 불러오기
          getCurrentLocation()
            .then(({ lat, lng }) => reverseGeocode(lat, lng))
            .then(address => {
              const guArea = extractGu(address);
              setSelectedArea(guArea);
              sessionStorage.setItem('selectedArea', guArea);
              console.log('Current location saved to sessionStorage:', guArea);
            })
            .catch(error => {
              console.error('Error fetching current location:', error);
            });
        }

      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedArea !== null) {
      onAreaSelect(selectedArea);
      sessionStorage.setItem('selectedArea', selectedArea);
      console.log('Selected area saved to sessionStorage:', selectedArea);
    }
  }, [selectedArea, onAreaSelect]);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const handleAreaClick = (area) => {
    const guArea = extractGu(area.preferredArea);
    setSelectedArea(guArea);
    setIsExpanded(false);
  };

  const selectedAreaDetails = areas.find(area => extractGu(area.preferredArea) === selectedArea);

  return (
    <div className={styles.container}>
      <h2 className={styles.title} onClick={handleToggle}>
        <FontAwesomeIcon icon={faLocationDot} /> {selectedAreaDetails ? selectedAreaDetails.preferredArea : selectedArea} {isExpanded ? '▲' : '▼'}
      </h2>
      {isExpanded && (
        <ul className={styles.areaList}>
          {areas.map((area) => (
            <li
              key={area.id}
              className={styles.areaItem}
              onClick={() => handleAreaClick(area)}
            >
              <span className={styles.areaName}>{extractGu(area.preferredArea)}</span>
              {area.alias && <span className={styles.areaAlias}>({area.alias})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavAreaSelector;
