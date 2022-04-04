import * as React from 'react';

import { useSelector } from 'react-redux';

import { checkGroup, ObjType } from '../../common/checkGroup.function';

import BarChart from './components/Chart';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import { TabsList } from './components/Styles/TabsList';
import { Tab } from './components/Styles/Tab';
import { TabPanel } from './components/Styles/TabPanel';

import { AppRootStateType } from '../../store/reducers';
import { transitCargoType } from '../../store/reducers/transits-reducer/types';
import {
    cargoType,
    commonCargosTypes,
} from '../../store/reducers/cargos-reducer/types';

import styles from './styles.module.scss';

const StatisticPage = () => {
    const commonCargos = useSelector<AppRootStateType, commonCargosTypes>(
        (state) => state.cargos
    );
    const { cargos } = commonCargos;

    const transitCargos = useSelector<AppRootStateType, transitCargoType[]>(
        (state) => state.transitCargo
    );
    const completedStatistics = transitCargos.filter(
        (item) => item.status === 'Completed'
    );
    const transitStatistics = transitCargos.filter(
        (tr) => tr.status === 'In Transit'
    );

    const totalNumberOfGroups = (el: cargoType[]) =>
        checkGroup(el).reduce((acc, num) => acc + num.amount, 0);
    const chartsArr = [
        { component: cargos, title: 'In stock' },
        { component: transitStatistics, title: 'In Transit' },
        { component: completedStatistics, title: 'Completed' },
    ];
    console.log(transitCargos);
    return (
        <div className={styles.main}>
            <div className={styles.heroBg} />
            <div className={styles.flexContainer}>
                <h1 className={styles.title}>Statistics cargos</h1>
                <TabsUnstyled className={styles.tabContainer} defaultValue={0}>
                    <TabsList>
                        {chartsArr.map((chartEl, i) => (
                            <Tab key={i} className={styles.tab}>
                                {chartEl.title}
                            </Tab>
                        ))}
                    </TabsList>
                    {chartsArr.map((chartEl, i) => (
                        <TabPanel key={i} value={i}>
                            <>
                                <h2 className={styles.subtitle}>
                                    {chartEl.title}
                                </h2>
                                <div className={styles.mainStatistic}>
                                    <div className={styles.barChart}>
                                        <BarChart
                                            cargos={
                                                checkGroup(
                                                    chartEl.component
                                                ) as ObjType[]
                                            }
                                            valueField="amount"
                                            argumentField="category"
                                            name={chartEl.title}
                                        />
                                    </div>
                                </div>
                                <div className={styles.totalBlock}>
                                    <span>Total items: </span>
                                    <span>
                                        {totalNumberOfGroups(chartEl.component)}
                                    </span>
                                </div>
                            </>
                        </TabPanel>
                    ))}
                </TabsUnstyled>
            </div>
        </div>
    );
};

export default StatisticPage;
