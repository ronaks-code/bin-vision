import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Leaderboard.module.css';
import { db } from '../../Firebase';
import { ref, onValue, off } from 'firebase/database';

const initialCoordinates = [33.7756, -84.3963]; // e.g., Georgia Tech

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Leaderboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBubbleInfo, setSelectedBubbleInfo] = useState(null);
  const [data, setData] = useState([]);

  const handleBubbleClick = (info) => {
    setSelectedBubbleInfo(info);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const dataRef = ref(db, 'Data');

    const successCallback = (snapshot) => {
        const firebaseData = snapshot.val();

        if (firebaseData) {
            const formattedData = Object.values(firebaseData).filter(Boolean).map(item => ({
                location: item.Location,
                binNumber: item['Bin Number'],
                itemsRecycled: item['Items Recycled'],
                itemsTrashed: item['Items Trashed'],
                latitude: item.Latitude,
                longitude: item.Longitude
            }));

            setData(formattedData);
        } else {
            console.error('No data retrieved from Firebase.');
        }
    };

    const errorCallback = (error) => {
        console.error('Firebase Error:', error);
    };

    onValue(dataRef, successCallback, errorCallback);

    return () => {
        off(dataRef, 'value', successCallback);
    };

  }, []);

  const sortedData = [...data].sort((a, b) => b.itemsRecycled - a.itemsRecycled);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leaderboard</h1>
      <div className={styles.header}>
        <span className={styles.headerText}>Location</span>
        <span className={styles.headerText}>Bin Number</span>
        <span className={styles.headerText}>Items Recycled</span>
      </div>
      {sortedData.map((item, index) => (
        <div key={index} onClick={() => handleBubbleClick(item)} className={styles.row}>
          <span className={styles.rowText}>{item.location}</span>
          <span className={styles.rowText}>{item.binNumber}</span>
          <span className={styles.rowText}>{item.itemsRecycled}</span>
        </div>
      ))}
      {isModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p className={styles.modalText}>Location: {selectedBubbleInfo.location}</p>
            <p className={styles.modalText}>Bin Number: {selectedBubbleInfo.binNumber}</p>
            <p className={styles.modalText}>Items Recycled: {selectedBubbleInfo.itemsRecycled}</p>
            <div className={styles.mapContainer}>
              <MapContainer center={initialCoordinates} zoom={15} style={{ width: '100%', height: '100%' }} attributionControl={false}>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    maxZoom={19}
                  />
                  <Marker position={[selectedBubbleInfo.latitude, selectedBubbleInfo.longitude]} icon={greenIcon}>
                    <Popup>{selectedBubbleInfo.binNumber}</Popup>
                  </Marker>
              </MapContainer>
            </div>
            <button onClick={closeModal} style={{ backgroundColor: '#228B22', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
