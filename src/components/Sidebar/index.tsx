import React from 'react';

import { NavLink } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import styles from './styles.module.scss';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <h1>Justice Cargos</h1>
                <LocalShippingIcon />
            </div>

            <ul className={styles.navbar}>
                <li>
                    <NavLink to="/">
                        <span>Current Cargos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/transits">
                        <span>Transits</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
