import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

import CargosPage from './pages/CargosPage';
import TransitsPage from './pages/TransitsPage';

import { Sidebar } from './components';

import { AppRootStateType } from './store/reducers';

import './assets/styles/_global.scss';
import styles from './styles.module.scss';

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
    const localStore = JSON.parse(localStorage.getItem('cargos') as string);

    const [error, setError] = useState('');

    const cargosInitial = useSelector<AppRootStateType, cargoType[]>(
        (state) => state.cargos
    );

    const [cargos, setCargos] = useState<cargoType[]>(
        localStore || cargosInitial
    );

    const [selectedCargo, setSelectedCargo] = useState<cargoType>({
        category: '',
        id: 0,
        name: '',
        quantity: 0,
        status: '',
        destination: '',
        attention: '-',
    });

    const [rowsInTransit, setRowsInTransit] = useState<cargoType[]>(
        JSON.parse(localStorage.getItem('transits') as string) || []
    );

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
                                cargos={cargos}
                                setCargos={setCargos}
                                selectedCargo={selectedCargo}
                                setSelectedCargo={setSelectedCargo}
                                rowsInTransit={rowsInTransit}
                                setRowsInTransit={setRowsInTransit}
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
                                rowsInTransit={rowsInTransit}
                                setRowsInTransit={setRowsInTransit}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
