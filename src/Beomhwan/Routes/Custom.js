import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import {
    useCustomChartInfo, 
    useCustomChartList, 
    useMachineInfo
} from '../ChartContext';
import Modal from '../Components/Modal';

// chart의 options 설정
export const options = {
    responsive: true,
    maintainAspectRatio: false,
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
const LineChart = ({chartData}) => {
    // 특정 DOM을 참조
    const ChartRef = useRef(null);

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
    width: 480px;
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
const CustomButton = styled.button`
    width: 100px;
    height: 40px;
    border: 1px solid gray;
    background-color: white;
    position: relative;
    top: 10px;
    left: 299px;
    user-select: none;
`;

const CustomStart = ({onStart, onRemove, macid, prgid}) => {

    return (
        <>
        <CustomButton onClick={() => onStart(macid, prgid)}>적용</CustomButton>
        <CustomButton onClick={() => onRemove(prgid)}>삭제</CustomButton>
        </>
    );
}

// 커스텀 컴포넌트
const Custom = () => {
    const chart = useCustomChartList();
    const chartInfo = useCustomChartInfo();
    const machineId = useMachineInfo();
    const [loading, setLoading] = useState(true);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setTimeout(() => {setLoading(false)}, 1500);
    },[]);

    // 커스텀 환경 적용 클릭 시 적용 테스트
    const onStart = (macid, prgid) => {
        setOpacity(1);
    };

    const onRemove = (prgid) => {
        setOpacity(1);
    };

    const onClose = () => {
        setOpacity(0);
    };

    return (
        <>
        { loading ?
            <>Now loading...</>
            :
                <CustomBox>
                {chart.map((ch,index) =>
                <div key={index}> 
                <CustomGraphStyle>
                    <p style={{userSelect: 'none'}}>사용 횟수 : {chartInfo[index].prg_count}</p>
                        <GraphTitle>- {chartInfo[index].prg_name} -</GraphTitle>
                    <LineChart chartData={ch}/>
                    <CustomStart 
                        onStart={onStart}
                        onRemove={onRemove} 
                        prgid={chartInfo[index].id}
                        macid={machineId} />
                </CustomGraphStyle>
                </div>
                )}
                <Modal opacity={opacity} onClose={onClose} />
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

// 삭제 코드
// console.log(prgid);
// axios.delete('http://172.26.3.62/api/farm', {params: {
//     id: prgid
// }}).then(response => {
//     console.log(response);
// }).catch(err => {
//     console.error(err);
// })

// 적용 코드
// console.log(macid, prgid);
//         //커스텀 프로그램 적용 put 코드
//         axios.put('http://172.26.3.62/api/myfarm/program', {
//             id: macid,
//             prgId: prgid
//         }).then(response => {
//             console.log(response);
//         }).catch(err => {
//             console.error(err);
//         });
