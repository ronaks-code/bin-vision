import React, { useRef, useState, useEffect } from "react";
import { uploadImage, fetchPicture} from "./api";
import styles from "./CameraFeed.module.css";
import { db } from "../../../Firebase";
import { get, ref, set } from "firebase/database";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const CameraFeed = ({ onCameraStateChange = () => {} }) => {
  const [prediction, setPrediction] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [selectedBin, setSelectedBin] = useState(1);
  const canvasRef = useRef(null)
  const [instructionText, setInstructionText] = useState(
    "Place an item in front of the camera to watch the magic happen!"
  );
  const selectedBinRef = useRef(1); // Use useRef instead of useState

  const incrementRecycledItem = async () => {
    console.log("Incrementing recycled item for bin:", selectedBinRef.current);
    const dataRef = ref(db, `Data/${selectedBinRef.current}/Items Recycled`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const currentValue = snapshot.val();
      set(dataRef, currentValue + 1);
    }
  };

  const incrementCompostItem = async () => {
    console.log("Incrementing composted item for bin:", selectedBinRef.current);
    const dataRef = ref(db, `Data/${selectedBinRef.current}/Items Composted`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const currentValue = snapshot.val();
      set(dataRef, currentValue + 1);
    }
  };

  const incrementTrashItem = async () => {
    console.log("Incrementing trashed item for bin:", selectedBinRef.current);
    const dataRef = ref(db, `Data/${selectedBinRef.current}/Items Trashed`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const currentValue = snapshot.val();
      set(dataRef, currentValue + 1);
    }
  };

  useEffect(() => {
    // Function to handle the 'g' keypress event
    const handleKeyPress = async (event) => {
      if (event.key === 'g') {
        console.log("Object detected")
        try {
          console.log('Here')
          const imageBlob = await fetchPicture(); // Fetch the image blob
          if (imageBlob) {
            console.log(imageBlob)
            const imageSrc = URL.createObjectURL(imageBlob);
            setImageSrc(imageSrc); // Display the fetched image
            
            const response = await uploadImage(imageBlob); // Upload the blob for prediction
            console.log(response)
            if (response && response.result) {
              setInstructionText(
                <div className="styles.predictionText">
                  Prediction: {response.result.toUpperCase()}
                </div>
              );
              if (
                ["glass", "plastic", "paper", "cardboard", "metal"].includes(
                  response.result.toLowerCase()
                )
              ) {
                incrementRecycledItem(selectedBin);
              } else if (response.result.toLowerCase() === "compost") {
                incrementCompostItem(selectedBin);
              } else if (response.result.toLowerCase() === "trash") {
                incrementTrashItem(selectedBin);
              }
            } else {
              setInstructionText(
                "Place an item in front of the camera to watch the magic happen!"
              );
            }
          }
        } catch (error) {
          console.error("Error in processing image:", error);
          setInstructionText("Failed to process the image. Try again!");
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);
 


  return (
    <div className={styles.cameraContainer}>
      {/* Dropdown for bin selection */}
      <div className={styles.dropdownContainer}>
        <select
          value={selectedBinRef.current}
          onChange={(e) => {
            selectedBinRef.current = Number(e.target.value);
            console.log("Selected Bin:", e.target.value);
          }}
          className={styles.dropdown}
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              Bin {num + 1}
            </option>
          ))}
        </select>
        <IoIosArrowDropdownCircle className={styles.dropdownIcon} />
      </div>
      <div className={styles.cameraBorder}>
        {imageSrc && <img src={imageSrc} alt="Fetched Snapshot" className={styles.fetchedImage} />}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
      <p className={styles.predictionText}>{instructionText}</p>
    </div>
  );
};

export default CameraFeed;
