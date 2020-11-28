import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Bar} from 'react-chartjs-2';

const randTemp = () => Math.floor(Math.random() * 15) + 20;
const randHumi = () => Math.floor(Math.random() * 30) + 70;

// chart내 data 세팅
const data = {
    labels: ['1','2','3','4','5','6'],
    datasets: [
        {
            type: 'bar',
            label: 'Temperature',
            data: [randTemp(), randTemp(), randTemp(), randTemp(), randTemp(), randTemp()],
            fill: false,
            backgroundColor: 'rgba(255,0,0,0.3)'
        },
        {   
            type: 'bar',
            label: 'Humidity',
            data: [randHumi(), randHumi(), randHumi(), randHumi(), randHumi(), randHumi()],
            fill: false,
            backgroundColor: 'rgba(0,0,255,0.3)'
        },
        {
            type: 'line',
            label: 'GrowthRate',
            data: [0, 0, 5, 10, 20, 25],
            fill: false,
            borderColor: 'gray'
        }
    ]
};

// chart의 options 설정
const options = {
    scales: {
        // y축 세팅
        yAxes: [
            {
                ticks: {
                    // 0부터 시작
                    beginAtZero: true,
                    // ~ 100까지
                    max: 100,
                    // 20 단위로 
                    stepSize: 20
                }
            }
        ]
    }
};

const LineChart = () => {
    const ChartRef = useRef();

    console.dir(ChartRef);

    return (
        <Bar data={data} options={options} ref={ChartRef}/>
    ) ;
}

const CustomBox = styled.div`
    display: flex;
    width: auto;
    height: auto;
    border-bottom: 1px solid gray;
`;

const CustomGraphStyle = styled.div`
    margin: 2vw 0 2vw 2vw;
    width: 30%;
    height: 25rem;
    border: 1px solid rgba(0,0,0,0.3);
    flex-wrap: wrap;
    &:hover {
        border: 1px solid black;
    }
    transition: 0.5s;
`;

const GraphTitle = styled.div`
    position: absolute;
    bottom: 0;
    width: 30rem;
    height: 60px;
    font-size: 1.2em;
    text-align: center;
    line-height: 60px;
    border: 1px solid gray;
`;

const Custom = () => {
    return (
        <>
            <div>
                <CustomBox>
                    <CustomGraphStyle><LineChart/><GraphTitle>랜덤 그래프</GraphTitle></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/></CustomGraphStyle>
                </CustomBox>
                <CustomBox>
                    <CustomGraphStyle><LineChart/></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/></CustomGraphStyle>
                </CustomBox>
                <CustomBox>
                    <CustomGraphStyle><LineChart/></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/></CustomGraphStyle>
                </CustomBox>
            </div>
        </>
    );
};

export default Custom;