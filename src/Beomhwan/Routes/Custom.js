import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';

// chart내 data 세팅
const data = {
    labels: ['1','2','3','4','5'],
    datasets: [
        {
            label: 'Temperature',
            data: [10, 20, 24, 19, 23],
            fill: false,
            borderColor: 'red'
        }
    ]
};

// chart의 options 설정
const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    max: 30
                }
            }
        ]
    }
};

const LineChart = () => {
    const ChartRef = useRef();

    console.dir(ChartRef);

    return (
        <Line data={data} options={options} ref={ChartRef}/>
    );
}

const CustomBox = styled.div`
    display: flex;
    width: auto;
    height: auto;
    border-bottom: 1px solid gray;
`;

const CustomGraphStyle = styled.div`
    margin: 2vw 0 2vw 2vw;
    width: 30rem;
    height: 25rem;
    border: 1px solid rgba(0,0,0,0.3);
    flex-wrap: wrap;
    &:hover {
        border: 1px solid black;
    }
    transition: 0.5s;
`;

const Custom = () => {
    return (
        <>
            <div>
                Setting / Custom
            </div>
            <CustomBox>
                <CustomGraphStyle><LineChart/></CustomGraphStyle>
                <CustomGraphStyle></CustomGraphStyle>
                <CustomGraphStyle></CustomGraphStyle>
            </CustomBox>
            <CustomBox>
                <CustomGraphStyle></CustomGraphStyle>
                <CustomGraphStyle></CustomGraphStyle>
                <CustomGraphStyle></CustomGraphStyle>
            </CustomBox>
            <CustomBox>
                <CustomGraphStyle></CustomGraphStyle>
                <CustomGraphStyle></CustomGraphStyle>
                <CustomGraphStyle></CustomGraphStyle>
            </CustomBox>
        </>
    );
};

export default Custom;