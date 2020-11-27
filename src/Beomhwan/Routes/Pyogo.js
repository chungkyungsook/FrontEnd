import React, {useRef, useEffect, memo, useState} from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';


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

// Chart 데이터 및 Chart js 인스턴스 반환
const Chart = () => {
    // Chart 데이터 정보
    const data = {
        labels: [
            '1일', '2일', '3일', '4일', '5일'
        ],
        datasets: [
            {
                label: '온도',
                data: [21, 23, 24, 21, 25],
                fill: false,
                borderColor: 'red'
            },
            {
                label: '습도',
                data: [80, 91, 78, 89, 79],
                fill: false,
                borderColor: 'blue'
            }
        ],
        options: {
            scales: {
                yAxes: [{
                    ticks: [{
                        beginAtZero: true,
                        stepSize: 10,
                        max: 100
                    }]
                }]
            }
        }
    }

    // useRef()로 특정 DOM 가져오기
    const chartReference = useRef();
    const [Environment, setEnvironment] = useState({
        Temperature: 0,
        Humidity: 0
    });

    // useEffect로 hooks의 lifecycle 관리
    useEffect(() => {
        console.log(chartReference.current);

        const { current:{
            chartInstance: {
                canvas
            }
        }} = chartReference;

        // console.dir(chartReference.current.chartInstance.boxes[2]._labelItems[0]);

        console.log(canvas.getBoundingClientRect());

        const Temp = chartReference.current.props.data.datasets[0].data[0];
        const Humid = chartReference.current.props.data.datasets[1].data[0];

        setEnvironment({
            Temperature: Temp,
            Humidity: Humid
        });   

        canvas.onClick = (e) => {
            console.log(e.offsetX);
            console.log(e.offsetY);
        };

        return () => {}
    }, [Environment.Temperature, Environment.Humidity]);

    

    return (
        <>
        <CanvasBox>
            <Line ref={chartReference} data={data}/>
        </CanvasBox>
        </>
    );
}

const Pyogo = () => {
    return (
        <PyogoStyled>
            Setting / Pyogo
            <Chart/>
        </PyogoStyled>
    );
};

export default memo(Pyogo);