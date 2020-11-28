import React, {useRef, useEffect, memo, useState} from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['1일차','2일차','3일차','4일차','5일차'],
    datasets: [
    {
        label: 'Temperature',
        data: [20, 24, 26, 23, 24],
        fill: false,
        borderColor: 'red'
    }
    ]
};

const options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                max: 35
            }
        }]
    }
};

const Chart = () => {
    const ChartRef = useRef();

    console.dir(ChartRef);

    return(
        <Line data={data} options={options} ref={ChartRef} />
    )
};

const PyogoStyled = styled.div`
    width: 100%;
    height: 100%;
`;

const CanvasBox = styled.div`
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50vw;
    height: 25vh;
`;

const Pyogo = () => {
    return (
        <PyogoStyled>
            Setting / Pyogo
            <Chart/>
        </PyogoStyled>
    );
};

export default memo(Pyogo);