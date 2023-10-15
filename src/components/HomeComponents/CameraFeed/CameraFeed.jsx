import React, { useRef, useState } from 'react';
import { uploadImage } from './api';
import styles from './CameraFeed.module.css';

const CameraFeed = () => {
  const [prediction, setPrediction] = useState(null);
  const videoRef = useRef(null);

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const handleCaptureImage = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const dataURL = canvas.toDataURL("image/jpeg");
    const response = await uploadImage(dataURL);
    setPrediction(`Prediction: ${response.result}`);
  };

  return (
    <div className={styles.container}>
      <video ref={videoRef} autoPlay className={styles.camera}></video>
      <button onClick={handleOpenCamera} className={`${styles.buttonBase} ${styles.openCameraButton}`}>Open Camera</button>
      <button onClick={handleCaptureImage} className={`${styles.buttonBase} ${styles.CameraFeed}`}>Capture & Predict</button>
      {prediction && <p className={styles.predictionText}>{prediction}</p>}
    </div>
  );
};

export default CameraFeed;
