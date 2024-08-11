import React, { useEffect, useState } from 'react';
import { getUserEmail, getToken, getRefreshToken } from '../../utils/authUtil';
import { FAVORITESTORE_URL } from '../../config/host-config';
import styles from './FavAreaSelector.module.scss';

const FavAreaSelector = ({ onAreaSelect }) => {
  const [areas, setAreas] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [customerId, setCustomerId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Fetch customerId if not already set
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
    if (!customerId) return;

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
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Areas data:', data);
        setAreas(data);

        const favoritesResponse = await fetch(`${FAVORITESTORE_URL}/favorites/${customerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'refreshToken': getRefreshToken(),
          },
        });

        if (!favoritesResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const favoritesData = await favoritesResponse.json();
        console.log('Favorites data:', favoritesData);

        const favoritesMap = favoritesData.reduce((acc, area) => {
          acc[area.id] = true;
          return acc;
        }, {});
        
        setFavorites(favoritesMap);

      } catch (error) {
        console.error('Error fetching areas or favorites:', error);
      }
    };

    fetchAreas();
  }, [customerId]);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const handleAreaClick = (areaId) => {
    onAreaSelect(areaId);
    setIsExpanded(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title} onClick={handleToggle}>
        {isExpanded ? '▲' : '▼'} 현재 등록된 주소
      </h2>
      {isExpanded && (
        <ul className={styles.areaList}>
          {areas.map((area) => (
            <li
              key={area.id}
              className={`${styles.areaItem} ${favorites[area.id] ? styles.selected : ''}`}
              onClick={() => handleAreaClick(area.id)}
            >
              <button
                className={`${styles.favoriteButton} ${favorites[area.id] ? styles.favorited : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setFavorites(prev => ({
                    ...prev,
                    [area.id]: !prev[area.id],
                  }));
                }}
              >
                ★
              </button>
              <span className={styles.areaName}>{area.preferredArea}</span>
              {area.alias && <span className={styles.areaAlias}>({area.alias})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavAreaSelector;
