import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import CargosPage from './pages/CargosPage';
import TransitsPage from './pages/TransitsPage';

import { Sidebar } from './components';

import './assets/styles/_global.scss';
import styles from './styles.module.scss';
import StatisticPage from './pages/StatisticPage';

export type cargoType = {
    id: number;
    name: string;
    category: string;
    quantity: number;
    status: string;
    destination?: string;
    attention?: string | number;
};

const App = () => {

    const [error, setError] = useState('');

    const [selectedCargo, setSelectedCargo] = useState<cargoType>({
        category: '',
        id: 0,
        name: '',
        quantity: 0,
        status: '',
        destination: '',
        attention: '-',
    });

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <div>
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
                    <Route
                        path="/statistics"
                        element={
                            <StatisticPage />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
