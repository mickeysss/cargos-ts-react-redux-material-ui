import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Sidebar } from './components';

import CargosPage from './pages/CargosPage';
import TransitsPage from './pages/TransitsPage';

import { mockCargos } from './mock';

import './assets/styles/_global.scss';
import styles from './styles.module.scss';

export type cargoType = {
    id: number;
    name: string;
    category: string;
    quantity: number;
    status: string;
    destination?: string;
};

function App() {
    const [cargos, setCargos] = useState<cargoType[]>([...mockCargos]);
    const [selectedCargo, setSelectedCargo] = useState<cargoType>({
        category: '',
        id: 0,
        name: '',
        quantity: 0,
        status: '',
        destination: '',
    });

    const [rowsInTransit, setRowsInTransit] = useState<cargoType[]>([]);

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <CargosPage
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
                            selectedCargo={selectedCargo}
                            setSelectedCargo={setSelectedCargo}
                            rowsInTransit={rowsInTransit}
                            setRowsInTransit={setRowsInTransit}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
