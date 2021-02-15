import React, {useRef, useEffect, useState, createContext} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import {
    useCustomChartInfo, 
    useCustomChartList, 
    useMachineInfo
} from '../ChartContext';
import Modal from '../Components/Modal';
import axios from 'axios';
import {Button, ModalTitleBox, ModalTextBox, ModalFooter} from '../Components/ModalContent';

// chart의 options 설정
export const options = {
    maintainAspectRatio: true,
    tooltips: {
        mode: 'index',
        intersect: false,
        position: 'nearest'
    },
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
};

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

const CustomStart = ({onStart, onRemove, prgid}) => {

    return (
        <>
        <CustomButton onClick={() => onStart(prgid)}>적용</CustomButton>
        <CustomButton onClick={() => onRemove(prgid)}>삭제</CustomButton>
        </>
    );
};

// 커스텀 컴포넌트
const Custom = () => {
    const chart = useCustomChartList();
    const chartInfo = useCustomChartInfo();
    const machineId = useMachineInfo();
    const [loading, setLoading] = useState(true);
    const [modalInfo, setModalInfo] = useState({
        opacity: false,
        customId: null,
        modalTextfirst: '',
        modalTextsecond: '',
        confirm: ''
    });

    useEffect(() => {
        setTimeout(() => {setLoading(false)}, 1500);
    },[]);

    // 커스텀 환경 적용 클릭 시 모달 on 및 텍스트 변경
    const onStart = (prgid) => {
        setModalInfo({
            opacity: true,
            customId: prgid,
            modalTextfirst: '한번 적용하면 도중에 취소가 불가능합니다.',
            modalTextsecond: '적용하시겠습니까?',
            confirm: 'start'
        });
    };

    // 커스텀 환경 삭제 클릭 시 모달 on 및 텍스트 변경
    const onRemove = (prgid) => {
        setModalInfo({
            opacity: true,
            customId: prgid,
            modalTextfirst: '정말 삭제하시겠습니까?',
            modalTextsecond: '',
            confirm: 'remove'
        });
    };

    const CustomModalFunction = (macid, prgid) => {
        switch(modalInfo.confirm) {
            case 'start':
                //커스텀 프로그램 적용 put 코드
                axios.put(`${URL}/api/myfarm/program`, {
                    id: macid,
                    prgId: prgid
                }).then(response => {
                    console.log(response);
                    setModalInfo({
                        opacity: false,
                        customId: null
                    });
                }).catch(err => {
                    console.error(err);
                });
                break;
            case 'remove':
                axios.delete(`${URL}/api/farm`, {params: {
                    id: prgid
                }}).then(response => {
                    console.log(response);
                    window.location.href = 'http://localhost:3000/setting/custom';
                }).catch(err => {
                    console.error(err);
                });
                break;
            default:
                setModalInfo({
                    opacity: false,
                    customId: null,
                    modalTextfirst: '',
                    modalTextsecond: '',
                    confirm: ''
                });
        }
    };

    const onClose = () => {
        setModalInfo({
            opacity: false,
            customId: null,
            modalTextfirst: '',
            modalTextsecond: '',
            confirm: ''
        });
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
                <Modal opacity={modalInfo.opacity} customId={modalInfo.customId} onClose={onClose} width='500' height='200'>
                    <ModalTitleBox>주의!</ModalTitleBox>
                    <ModalTextBox>{modalInfo.modalTextfirst}</ModalTextBox>
                    <ModalTextBox>{modalInfo.modalTextsecond}</ModalTextBox>
                    <ModalFooter>
                    <Button onClick={() => CustomModalFunction(machineId, modalInfo.customId)}>확인</Button>
                    <Button onClick={onClose}>취소</Button>
                    </ModalFooter>
                </Modal>
            </CustomBox>
        }
        </>
    );
};

export default Custom;