import React from 'react';
import styles from './BlinkingCursor.module.css';

const BlinkingCursor = () => {
    return (
        <div className='container'>
            <span className={styles.cursor}>|</span>
        </div>
    );
};

export default BlinkingCursor;
