import React, {useRef, useEffect, memo, useState} from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';


const data = {
    labels: ['1일차','2일차','3일차','4일차','5일차'],
    datasets: [
    {
        type: 'bar',
        label: 'Temperature',
        data: [20, 20, 20, 20, 20],
        fill: false,
        backgroundColor: 'rgba(255,0,0,0.3)',
    },
    {
        type: 'bar',
        label: 'Humidity',
        data: [80, 80, 80, 80, 80],
        fill: false,
        backgroundColor: 'rgba(0,0,255,0.3)',
    },
    {
        type: 'line',
        label: 'GrowthRate',
        data: [0, 5, 12, 25, 33],
        fill: false,
        borderColor: 'black'
    }
    ]
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {    
                    beginAtZero: true,
                    max: 100,
                    stepSize: 20,
                }
            }
        ]
    }
};

const Chart = () => {
    const ChartRef = useRef();

    console.dir(ChartRef);

    return(
        <Bar data={data} options={options} ref={ChartRef} />
    )
};

const PyogoStyled = styled.div`
    width: 100%;
    height: 100%;
`;

const CanvasBox = styled.div`
    box-sizing: border-box;
    margin : 50px auto ;
    width: 80%;
    margin-bottom: 2rem;
`;

const FooterBox = styled.div`
    margin: 50px auto;
    width: 80%;
    height: 2rem;
    /* position: absolute; */
    bottom: 1rem;
    border: 1px solid gray;
`;

const Pyogo = () => {
    return (
        <PyogoStyled>
            <CanvasBox>
            <Chart/>
            </CanvasBox>
            <FooterBox />
        </PyogoStyled>
    );
};

export default Pyogo;