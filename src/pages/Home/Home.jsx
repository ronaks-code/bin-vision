import React from 'react';
import Factoid from "../../components/HomeComponents/Factoid/Factoid";
import CameraFeed from '../../components/HomeComponents/CameraFeed/CameraFeed';
import styles from './Home.module.css';

const Home = () => {
  const handleItemDisposed = () => {
    window.alert('Success! Item successfully thrown in the bin!');
  };

  const handleApiResponse = (response) => {
    console.log('API Response:', response);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BinVision</h1>
      <Factoid />
      <CameraFeed 
        onItemDisposed={handleItemDisposed} 
        onApiResponse={handleApiResponse} 
      />
      {/* Other components */}
    </div>
  );
};

export default Home;
