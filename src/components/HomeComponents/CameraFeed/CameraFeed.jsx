import React, { useRef, useState, useEffect } from "react";
import { uploadImage } from "./api";
import styles from "./CameraFeed.module.css";
import { db } from "../../../Firebase"
import { get, ref, set } from 'firebase/database';

const incrementRecycledItem = async () => {
  const dataRef = ref(db, 'Data/1/Items Recycled');  // Assuming "1" is the key of the first item in the database

  // Fetch the current value
  const snapshot = await get(dataRef);
  if (snapshot.exists()) {
    const currentValue = snapshot.val();
    
    // Update the value in the database
    set(dataRef, currentValue + 1);
  }
};

const CameraFeed = ({ onCameraStateChange = () => {} }) => {
  const [prediction, setPrediction] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Add state to track camera open/close
  const prevFrameRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let frameProcessingInterval = null;
  const THRESHOLD = 7000000;

  useEffect(() => {
    return () => {
      clearInterval(frameProcessingInterval);
      onCameraStateChange(false);
    };
  }, []);

  const handleToggleCamera = async () => {
    if (!isCameraOpen) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
        videoRef.current.onloadedmetadata = (e) => {
          canvasRef.current.width = e.target.videoWidth;
          canvasRef.current.height = e.target.videoHeight;
        };

        clearInterval(frameProcessingInterval);
        frameProcessingInterval = setInterval(processFrame, 1500);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    } else {
      // Close the camera
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setIsCameraOpen(false);
      setPrediction(null); // Clear the prediction when closing the camera
    }
  };

  const calculateFrameDifference = (frame1, frame2) => {
    let diff = 0;
    let countDifferingPixels = 0;

    for (let i = 0; i < frame1.data.length; i += 4) {
      const pixelDiff = Math.abs(frame1.data[i] - frame2.data[i]);
      diff += pixelDiff;

      if (pixelDiff > 30) {
        countDifferingPixels++;
      }
    }

    return { totalDifference: diff, differingPixels: countDifferingPixels };
  };

  const processFrame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (prevFrameRef.current) {
      const { totalDifference, differingPixels } = calculateFrameDifference(
        prevFrameRef.current,
        currentFrame
      );

      const percentageDifference =
        (differingPixels / (canvas.width * canvas.height)) * 100;

      if (totalDifference > THRESHOLD && percentageDifference > 50) {
        handleCaptureImage();
      }
    }

    prevFrameRef.current = currentFrame;
  };

  const handleCaptureImage = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/jpeg");
    const response = await uploadImage(dataURL);
    setPrediction(`Prediction: ${response.result}`);
    if (['glass', 'plastic', 'paper'].includes(response.result.toLowerCase())) {
      console.log("yes")
      incrementRecycledItem();
    }
  };

  return (
    <div className={styles.cameraContainer}>
      <div className={styles.cameraBorder}>
        <video ref={videoRef} autoPlay className={styles.cameraVideo}></video>
      </div>
      <button
        onClick={handleToggleCamera}
        className={styles.toggleCameraButton}
      >
        {isCameraOpen ? "Close Camera" : "Open Camera"}
      </button>
      {prediction && <p className={styles.predictionText}>{prediction}</p>}
    </div>
  );
};

export default CameraFeed;
