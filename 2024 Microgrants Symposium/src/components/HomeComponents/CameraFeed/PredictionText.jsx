import React from 'react';
import styles from './PredictionText.module.css'; // Assume you have corresponding CSS

const PredictionText = ({ text }) => {
  return (
    <div className={styles.predictionContainer}>
      <p className={styles.predictionText}>{text}</p>
    </div>
  );
};

export default PredictionText;
