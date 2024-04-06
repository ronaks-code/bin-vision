// IntroPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Factoid from '../../components/HomeComponents/Factoid/Factoid';
import styles from './Intro.module.css';

const IntroPage = () => {
  return (
    <div className={styles.introPage}>
      <div className={styles.imagecontainer}>
        <img
          src="src\pages\Intro\logo.png"
          className={styles.introimage}
        />
      </div>
      <Factoid />
      <Link to="/home" className={styles.getStartedButton}>
        Get Started
      </Link>
    </div>
  );
};

export default IntroPage;
