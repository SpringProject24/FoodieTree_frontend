import React, { useEffect, useState } from 'react';
import { getUserEmail, getToken, getRefreshToken } from '../../utils/authUtil';
import { FAVORITESTORE_URL } from '../../config/host-config';
import styles from './FavAreaSelector.module.scss';

const FavAreaSelector = ({ onAreaSelect }) => {
  const [areas, setAreas] = useState([]);
  const [stores, setStores] = useState([]);
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
        console.log('Areas data:', data);
        setAreas(data);

        // Id가 작은 기준으로 기본값 렌더링
        if (data.length > 0) {
          const lowestId = Math.min(...data.map(area => area.id));
          setSelectedArea(lowestId);
        }

      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (!selectedArea) return;

    const fetchStores = async () => {
      try {
        const response = await fetch(`${FAVORITESTORE_URL}/stores?areaId=${selectedArea}`, {
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
        setStores(data);

      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, [selectedArea]);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const handleAreaClick = (areaId) => {
    setSelectedArea(areaId);
    setIsExpanded(false);
  };

  const selectedAreaDetails = areas.find(area => area.id === selectedArea);

  return (
    <div className={styles.container}>
      <h2 className={styles.title} onClick={handleToggle}>
        {isExpanded ? '▲' : '▼'} {selectedAreaDetails ? selectedAreaDetails.preferredArea : '현재 등록된 주소'}
      </h2>
      {isExpanded && (
        <ul className={styles.areaList}>
          {areas.map((area) => (
            <li
              key={area.id}
              className={styles.areaItem}
              onClick={() => handleAreaClick(area.id)}
            >
              <span className={styles.areaName}>{area.preferredArea}</span>
              {area.alias && <span className={styles.areaAlias}>({area.alias})</span>}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.storesContainer}>
        <h3 className={styles.storesTitle}>가게 목록</h3>
        <ul className={styles.storesList}>
          {stores.map(store => (
            <li key={store.id} className={styles.storeItem}>
              <span className={styles.storeName}>{store.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavAreaSelector;
