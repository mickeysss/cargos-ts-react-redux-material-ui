import React from 'react';

import { Chart, Series } from 'devextreme-react/chart';
import { ObjType } from '../../../../common/checkGroup.function';

type Props = {
    valueField: string;
    argumentField: string;
    name: string;
    cargos: ObjType[];
};

const BarChart = ({ valueField, argumentField, cargos, name }: Props) => {
    return (
        <Chart id="chart" dataSource={cargos as ObjType[]}>
            <Series
                valueField={valueField}
                argumentField={argumentField}
                name={name}
                type="bar"
                color="#d99f2c"
            />
        </Chart>
    );
};

export default BarChart;
