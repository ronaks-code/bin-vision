import React, { useState } from "react";
import styles from "./Stats.module.css";
import Map from "../../components/Map/Map";
import Leaderboard from "../../components/Leaderboard/Leaderboard";

const Stats = () => {
  const [activeView, setActiveView] = useState("leaderboard");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Statistics</h1>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${
            activeView === "map" && styles.activeButton
          }`}
          onClick={() => setActiveView("map")}
        >
          <span className={styles.buttonText}>Map</span>
        </button>
        <button
          className={`${styles.button} ${
            activeView === "leaderboard" && styles.activeButton
          }`}
          onClick={() => setActiveView("leaderboard")}
        >
          <span className={styles.buttonText}>Leaderboard</span>
        </button>
      </div>
      {activeView === "map" && <Map />}
      {activeView === "leaderboard" && <Leaderboard />}
    </div>
  );
};

export default Stats;
