import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

const initialCoordinates = [33.7756, -84.3963];  // adjust as needed

const Map = () => {
  return (
    <div className={styles.mapContainer}>
        <MapContainer center={initialCoordinates} zoom={15} style={{ width: '100%', height: '100%' }} attributionControl={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />
        </MapContainer>
    </div>
  );
};

export default Map;
