import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Leaderboard.module.css';

const initialCoordinates = [33.7756, -84.3963]; // e.g., Georgia Tech
const data = [
  { location: 'Claus', binNumber: 1, poundsRecycled: 25 },
  { location: 'CULC', binNumber: 2, poundsRecycled: 10 },
];

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

  const handleBubbleClick = (info) => {
    setSelectedBubbleInfo(info);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leaderboard</h1>
      <div className={styles.header}>
        <span className={styles.headerText}>Location</span>
        <span className={styles.headerText}>Bin Number</span>
        <span className={styles.headerText}>Pounds Recycled</span>
      </div>
      {data.map((item, index) => (
        <div key={index} onClick={() => handleBubbleClick(item)} className={styles.row}>
          <span className={styles.rowText}>{item.location}</span>
          <span className={styles.rowText}>{item.binNumber}</span>
          <span className={styles.rowText}>{item.poundsRecycled}</span>
        </div>
      ))}
      {isModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p className={styles.modalText}>Location: {selectedBubbleInfo.location}</p>
            <p className={styles.modalText}>Bin Number: {selectedBubbleInfo.binNumber}</p>
            <p className={styles.modalText}>Pounds Recycled: {selectedBubbleInfo.poundsRecycled}</p>
            <div className={styles.mapContainer}>
              <MapContainer center={initialCoordinates} zoom={15} style={{ width: '100%', height: '100%' }} attributionControl={false}>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    maxZoom={19}
                  />
                  <Marker position={initialCoordinates} icon={greenIcon}>
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
