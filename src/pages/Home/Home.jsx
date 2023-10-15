import React, { useState } from 'react';
import Factoid from "../../components/HomeComponents/Factoid/Factoid";
import CameraFeed from '../../components/HomeComponents/CameraFeed/CameraFeed';
import styles from './Home.module.css';

const Home = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const handleItemDisposed = () => {
    window.alert('Success! Item successfully thrown in the bin!');
  };

  const handleApiResponse = (response) => {
    console.log('API Response:', response);
  };
  console.log(isCameraOpen)

  return (
    <div className={`${styles.container} ${isCameraOpen ? styles.cameraActive : ''}`}>
      <div className={styles.stars}></div>  {/* Stars layer */}
      <h1 className={styles.title}>BinVision</h1>
      {!isCameraOpen && <Factoid />}
      <CameraFeed onCameraStateChange={setIsCameraOpen} 
        onItemDisposed={handleItemDisposed} 
        onApiResponse={handleApiResponse} 
      />
      {/* Other components */}
    </div>
  );
};

export default Home;
