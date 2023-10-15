import React, { useState } from "react";
import Factoid from "../../components/HomeComponents/Factoid/Factoid";
import CameraFeed from "../../components/HomeComponents/CameraFeed/CameraFeed";
import styles from "./Home.module.css";
import { IoEarthSharp } from "react-icons/io5";

const Home = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleItemDisposed = () => {
    window.alert("Success! Item successfully thrown in the bin!");
  };

  const handleApiResponse = (response) => {
    console.log("API Response:", response);
  };

  return (
    <div className={styles.container}>
      <div className={styles.stars}></div> {/* Stars layer */}
      <h1 className={styles.title}>
        <span className={styles.icon}>
          <IoEarthSharp size={48} />
        </span>
        BinVision
      </h1>
      {/* Placeholder icon */}
      <CameraFeed
        onCameraStateChange={setIsCameraOpen}
        onItemDisposed={handleItemDisposed}
        onApiResponse={handleApiResponse}
      />
    </div>
  );
};

export default Home;
