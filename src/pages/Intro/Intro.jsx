// IntroPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link to create a link to the home page
import Factoid from '../../components/HomeComponents/Factoid/Factoid'; // Assuming you have a Factoid component
import styles from './Intro.module.css'; // Create a CSS module for styling

const IntroPage = () => {
  return (
    <div className={styles.introPage}>
      <h1 className={styles.title}>BinVision</h1>
      <p className={styles.quote}>Revolutionize Recycling</p>
      <Factoid />
      <Link to="/home" className={styles.getStartedButton}>
        Get Started
      </Link>
    </div>
  );
};

export default IntroPage;
