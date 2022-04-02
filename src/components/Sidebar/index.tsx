import React from 'react';

import { NavLink } from 'react-router-dom';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import styles from './styles.module.scss';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <h1>Justice Cargos</h1>
                <div className={styles.road}>
                    <div className={styles.icon}>
                        <LocalShippingIcon />
                    </div>
                    <span className={styles.line} />
                    <div className={styles.icon2}>
                        <LocalShippingIcon />
                    </div>
                </div>
            </div>

            <ul className={styles.navbar}>
                <li className={styles.navItem}>
                    <NavLink to="/">
                        <span>Cargos</span>
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink to="/transits">
                        <span>Transits</span>
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink to="/statistics">
                        <span>Statistics</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
