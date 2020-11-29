import React, {useRef, useEffect, memo} from 'react';
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

// 환경 그래프 객체 DOM 반환
const LineChart = () => {
    // 특정 DOM을 참조
    const ChartRef = useRef();

    // Chart.js instance 객체 확인
    console.dir(ChartRef);

    return (
        <Bar data={data} options={options} ref={ChartRef}/>
    ) ;
}

// 환경 프로그램 div - 이 안에 3개의 커스텀 환경이 있음
const CustomBox = styled.div`
    padding: 10px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    height: auto;
    border-bottom: 1px solid rgba(0,0,0,0.3);
`;

// 커스텀 환경 프로그램 그래프
const CustomGraphStyle = styled.div`
    margin: 2vw 0 2vw 2vw;
    width: 30%;
    height: auto;
    border: 1px solid rgba(0,0,0,0.3);
    flex-wrap: wrap;
    &:hover {
        border: 1px solid black;
    }
    transition: 0.5s;
`;

// 커스텀 환경 프로그램 이름
const GraphTitle = styled.div`
    height: 60px;
    font-size: 1.2em;
    text-align: center;
    line-height: 60px;
    border-radius : 5px;
    color: rgba(0,0,0,0.7);
    border: 1px solid rgba(0,0,0,0.3);
    &:hover {
        color: black;
        border: 1px solid black;
    }
    transition: 0.5s;
`;

const Custom = () => {
    return (
        <>
            <div>
                <CustomBox>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 1</GraphTitle></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 2</GraphTitle></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 3</GraphTitle></CustomGraphStyle>
                </CustomBox>
                <CustomBox>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 4</GraphTitle></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 5</GraphTitle></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 6</GraphTitle></CustomGraphStyle>
                </CustomBox>
                <CustomBox>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 7</GraphTitle></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 8</GraphTitle></CustomGraphStyle>
                    <CustomGraphStyle><LineChart/><GraphTitle>커스텀 환경 9</GraphTitle></CustomGraphStyle>
                </CustomBox>
            </div>
        </>
    );
};

export default Custom;