import React, { useState, useEffect } from "react";
import Factoid from "../../components/HomeComponents/Factoid/Factoid";
import CameraFeed from "../../components/HomeComponents/CameraFeed/CameraFeed";
import PredictionText from "../../components/HomeComponents/CameraFeed/PredictionText";
import styles from "./Home.module.css";
import { IoEarthSharp } from "react-icons/io5";
import useFetchBinsData from '../../components/useFetchBinsData';

const Home = () => {
  const originalMessage = "Scan Item";
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [predictionText, setPredictionText] = useState(originalMessage);
  const binsData = useFetchBinsData();
  const [selectedBin, setSelectedBin] = useState('1'); // Adjust according to your data structure.

  const handleItemDisposed = () => {
    window.alert("Success! Item successfully thrown in the bin!");
  };

  const handleApiResponse = (response) => {
    console.log("API Response:", response);
    setPredictionText(`Prediction: ${response.result.toUpperCase()}`);
  };

  // Revert prediction text to original message after 5 seconds
  useEffect(() => {
    let timer;
    if (predictionText !== originalMessage) {
      timer = setTimeout(() => {
        setPredictionText(originalMessage);
      }, 5000); // 5000 ms = 5 seconds
    }
    // Clear the timer if the component unmounts or if the predictionText changes again before the timer runs out
    return () => clearTimeout(timer);
  }, [predictionText, originalMessage]);

  const selectedBinStats = binsData.find(bin => bin.binNumber == selectedBin);

  return (
    <div className={styles.container}>
      <PredictionText text={predictionText} />
      <div className={styles.cameraFeedTopLeft}>
        <CameraFeed
          selectedBin={selectedBin}
          setSelectedBin={setSelectedBin}
          onCameraStateChange={setIsCameraOpen}
          onItemDisposed={handleItemDisposed}
          onApiResponse={handleApiResponse}
        />
      </div>
      <div className={styles.stars}></div>
      <h1 className={styles.title}>
        <span className={styles.icon}>
          <IoEarthSharp size={48} />
        </span>
        BinVision
      </h1>
      {/* Statistics Table for Selected Bin */}
      <div className={styles.statisticsTable}>
        <h2>Bin Statistics</h2>
        {selectedBinStats ? (
          <table>
            <thead>
              <tr>
                <th>Items Recycled</th>
                <th>Items Trashed</th>
                <th>Items Composted</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedBinStats.itemsRecycled}</td>
                <td>{selectedBinStats.itemsTrashed}</td>
                <td>{selectedBinStats.itemsComposted}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No data available for the selected bin.</p>
        )}
      </div>
      {/* Other elements and components */}
    </div>
  );
};

export default Home;

