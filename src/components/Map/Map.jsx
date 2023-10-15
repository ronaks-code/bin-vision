import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';
import { db } from '../../Firebase'; // Assuming you have this file in the hierarchy
import { ref, onValue, off } from 'firebase/database';

const initialCoordinates = [33.7756, -84.3963]; // adjust as needed

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = () => {
  const [locations, setLocations] = useState([]);

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

            setLocations(formattedData);
        } else {
            console.error('No data retrieved from Firebase.');
        }
    };

    onValue(dataRef, successCallback);

    return () => {
        off(dataRef, 'value', successCallback);
    };

  }, []);

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={initialCoordinates} zoom={15} style={{ width: '100%', height: '100%' }} attributionControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc.latitude, loc.longitude]} icon={greenIcon}>
            <Popup>
              <div>
                <p>Location: {loc.location}</p>
                <p>Bin Number: {loc.binNumber}</p>
                <p>Items Recycled: {loc.itemsRecycled}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

