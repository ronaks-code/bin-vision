import React from "react";
import styles from "./BlinkingCursor.module.css";

const BlinkingCursor = () => {
    return (
        <span className={styles.cursor}>|</span>
    );
};

export default BlinkingCursor;
