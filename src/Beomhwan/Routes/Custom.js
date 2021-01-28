import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import {useCustomChartInfo, useCustomChartList} from '../ChartContext';
import Modal from '../Components/Modal';

// chart의 options 설정
const options = {
    maintainAspectRatio: true,
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

// 환경 그래프 반환
const BarChart = ({chartData}) => {

    // 특정 DOM을 참조
    const ChartRef = useRef(null);

    console.dir(ChartRef);

    return (
        <Line data={chartData} options={options} ref={ChartRef}/>
    ) ;
}

// 환경 프로그램 div - 이 안에 3개의 커스텀 환경이 있음

const CustomBox = styled.div`
    padding: 10px;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    height: auto;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    flex-wrap: wrap;
`;

// 커스텀 환경 프로그램 그래프
const CustomGraphStyle = styled.div`
    margin: 2vw 0 2vw 2vw;
    width: 500px;
    height: auto;
    border: 1px solid rgba(0,0,0,0.3);
    flex-wrap: wrap;
    align-items: center;
    &:hover {
        border: 1px solid black;
    };
    transition: 0.5s;
`;

// 커스텀 환경 프로그램 이름
const GraphTitle = styled.div`
    user-select: none;
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
    };
    transition: 0.5s;
`;

// 커스텀 환경 적용 버튼
const CustomStartButton = styled.button`
    width: 100px;
    height: 40px;
    border: 1px solid gray;
    background-color: white;
    position: relative;
    top: 10px;
    left: 399px;
    user-select: none;
`;

const CustomStart = ({id, onStart}) => {

    return (
        <CustomStartButton onClick={() => onStart(id)}>적용</CustomStartButton>
    );
}

// 커스텀 컴포넌트
const Custom = () => {
    const chart = useCustomChartList();
    const chartInfo = useCustomChartInfo();
    const [loading, setLoading] = useState(true);
    const [opacity, setOpacity] = useState(false);

    useEffect(() => {
        setTimeout(setLoading(false), 4000);
    },[]);

    // 커스텀 환경 적용 클릭 시 적용 테스트
    const onStart = (id) => {
        console.log(id);
        setOpacity(true);
    };

    const onOverlayClick = () => {
        setOpacity(false);
    }

    return (
        <>
        { loading ?
            <>Now loading...</>
            :
            <CustomBox>
                {chart.map((ch,index) =>
                <> 
                <CustomGraphStyle key={index}>
                    <p style={{userSelect: 'none'}}>사용 횟수 : {chartInfo[index].prg_count}</p>
                    <GraphTitle>- {chartInfo[index].prg_name} -</GraphTitle>
                    <BarChart chartData={ch}/>
                    <CustomStart onStart={onStart} id={chartInfo[index].id}>적용</CustomStart>
                </CustomGraphStyle>
                {/* <Modal opacity={opacity} onOverlayClick={onOverlayClick} /> */}
                </>
                )}
            </CustomBox> 
        }
        </>
    );
};

export default Custom;

// 지금 당장 해야할거 
// 리스트 잘 출력하는거
// 3개씩 끊어서 출력해야함
// array.map을 다시한번 짚고 넘어가는게 좋을까?




// 커스텀 프로그램 적용 put 코드
// axios.put('http://172.26.3.62/api/myfarm/program', {
//     id: 1,
//     prgId: id
// }).then(response => {
//     console.log(response);
// }).catch(err => {
//     console.error(err);
// })