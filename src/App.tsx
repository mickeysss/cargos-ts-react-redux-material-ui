import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import CargosPage from './pages/CargosPage';
import TransitsPage from './pages/TransitsPage';

import { Sidebar } from './components';

import './assets/styles/_global.scss';
import StatisticPage from './pages/StatisticPage';
import { cargoType } from './store/reducers/cargos-reducer/types';

import styles from './styles.module.scss';

const App = () => {
    const [error, setError] = useState('');

    const [selectedCargo, setSelectedCargo] = useState<cargoType>({
        category: '',
        id: 0,
        position: '',
        cargoNumber: '',
        status: '',
        destinationFrom: '',
        destinationTo: '',
        attention: '-',
        quantity: 0,
    });

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <div className={styles.mainContainer}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <CargosPage
                                error={error}
                                setError={setError}
                                selectedCargo={selectedCargo}
                                setSelectedCargo={setSelectedCargo}
                            />
                        }
                    />
                    <Route
                        path="/transits"
                        element={
                            <TransitsPage
                                error={error}
                                setError={setError}
                                selectedCargo={selectedCargo}
                                setSelectedCargo={setSelectedCargo}
                            />
                        }
                    />
                    <Route path="/statistics" element={<StatisticPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
