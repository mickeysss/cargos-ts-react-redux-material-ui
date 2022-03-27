import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Sidebar } from './components';
import CurrentCargos from './pages/CurrentCargos';

import { mockCargos } from './mock';

import './assets/styles/_global.scss';
import styles from './styles.module.scss';

export type cargoType = {
    id: number;
    name: string;
    category: string;
    quantity: number;
};

function App() {
    const [cargos, setCargos] = useState<cargoType[]>([...mockCargos]);

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <Routes>
                <Route
                    path="/cargos"
                    element={
                        <CurrentCargos cargos={cargos} setCargos={setCargos} />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
