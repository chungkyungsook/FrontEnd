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
    display: flex;
    flex-direction: column;
`;

const CanvasBox = styled.div`
    padding: 50px;
    box-sizing: border-box;
    margin: 0 auto;
    width: 80%;
    margin-bottom: 2rem;
`;

const FooterBox = styled.div`
    margin: 0 auto;
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: row-reverse;
`;

const ButtonStyled = styled.button`
    background: none;
    box-shadow: none;
    border: 1px solid gray;
    width: 10%;
    font-size: 1.2em;
    height: 50px;
    &:hover{
        background: beige;
    }
    &:active, &:visited{
        border: 1px solid gray;
    }
    transition: 0.3s;
`;

const Button = () => {
    return <ButtonStyled>적용</ButtonStyled>
}

const Pyogo = () => {
    return (
        <PyogoStyled>
            <CanvasBox>
                <Chart/>
            </CanvasBox>
            <FooterBox>
                <Button/>
            </FooterBox>
        </PyogoStyled>
    );
};

export default Pyogo;