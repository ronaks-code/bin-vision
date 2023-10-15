import React, { useRef, useState, useEffect } from "react";
import { uploadImage } from "./api";
import styles from "./CameraFeed.module.css";

const CameraFeed = () => {
  const [prediction, setPrediction] = useState(null);
  const prevFrameRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let frameProcessingInterval = null;
  const THRESHOLD = 7000000;

  useEffect(() => {
    return () => {
      clearInterval(frameProcessingInterval);
    };
  }, []);

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = (e) => {
        canvasRef.current.width = e.target.videoWidth;
        canvasRef.current.height = e.target.videoHeight;
      };

      clearInterval(frameProcessingInterval);
      frameProcessingInterval = setInterval(processFrame, 1500);
    } catch (err) {
      console.error("Error accessing camera:", err);
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
  };

  return (
    <div className="container">
      {prediction && <p className="predictionText">{prediction}</p>}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <video ref={videoRef} autoPlay className="camera"></video>
      <button
        onClick={handleOpenCamera}
        className={`${styles.buttonBase} ${styles.openCameraButton}`}
      >
        Open Camera
      </button>
      {/* <button
        onClick={handleCaptureImage}
        className={`${styles.buttonBase} ${styles.CameraFeed}`}
      >
        Capture & Predict
      </button> */}
    </div>
  );
};

export default CameraFeed;
