import React from 'react';
import styles from '../../styles.module.scss';
const CompletedPage = () => {
    return (
        <div className={styles.flexContainer}>
            <h2 className={styles.title}>All transits</h2>
            <div className={styles.cargosList} />
        </div>
    );
};

export default CompletedPage;
