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
import {URL} from '../Util';
import {flexAlign} from '../../Util/css';

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
    border-radius: 5px;
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
    box-shadow: 0 5px 5px rgba(0,0,0,0.4);
    background-color: white;
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
    left: 279px;
    user-select: none;
    box-shadow: 0 5px 5px rgba(0,0,0,0.4);
`;

const CustomStart = ({onStart, onRemove, prgid}) => {

    return (
        <>
        <CustomButton onClick={() => onStart(prgid)}>적용</CustomButton>
        <CustomButton onClick={() => onRemove(prgid)}>삭제</CustomButton>
        </>
    );
};

const AddMessageBox = styled.div`
    ${flexAlign};
    height: 200px;
    border: 1px solid gray;
    border-radius: 20px;
    flex: 1;
    font-size: 1.3em;
`;

// 커스텀 컴포넌트
const Custom = () => {
    const chart = useCustomChartList();
    const chartInfo = useCustomChartInfo();
    const machineId = useMachineInfo();
    const [loading, setLoading] = useState(true);
    const [customChart, setCustomChart] = useState([]);
    const [modalInfo, setModalInfo] = useState({
        opacity: 0,
        customId: null,
        titleText: '',
        modalTextfirst: '',
        modalTextsecond: '',
        confirm: ''
    });

    useEffect(() => {
        chart.map((ch, i) => {
            setCustomChart(cus => cus.concat({
                prg_id: chartInfo[i].id,
                prg_name: chartInfo[i].prg_name,
                data: ch,
                prg_count: chartInfo[i].prg_count
            }));
        });

        setTimeout(() => {setLoading(false)}, 1500);
    },[]);

    // 커스텀 환경 적용 클릭 시 모달 on 및 텍스트 변경
    const onStart = (prgid) => {
        console.log(customChart);
        console.log(prgid);
        setModalInfo({
            opacity: 1,
            customId: prgid,
            titleText: '주의!',
            modalTextfirst: '한번 적용하면 도중에 취소가 불가능합니다.',
            modalTextsecond: '적용하시겠습니까?',
            confirm: 'start'
        });
    };

    // 커스텀 환경 삭제 클릭 시 모달 on 및 텍스트 변경
    const onRemove = (prgid) => {
        setModalInfo({
            opacity: 1,
            customId: prgid,
            titleText: '주의!',
            modalTextfirst: '정말 삭제하시겠습니까?',
            modalTextsecond: '',
            confirm: 'remove'
        });
    };

    // 시작 삭제 클릭 시 모달 설정
    const CustomModalFunction = (macid, prgid) => {
        console.log(macid);
        switch(modalInfo.confirm) {
            case 'start':
                //커스텀 프로그램 적용 put 코드
                axios.put(`${URL}/api/myfarm/program`, {
                    id: 1, //macid
                    prgId: prgid
                }).then(response => {
                    console.log(response);
                    setModalInfo({
                        ...modalInfo,
                        opacity: 1,
                        customId: prgid,
                        titleText: '',
                        modalTextfirst: '적용 했습니다.',
                        modalTextsecond: '프로그램이 종료 될 때까지 프로그램을 바꿀 수 없으니 주의해주세요.'
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
                    setCustomChart(cu => cu.filter(id => id.prg_id !== prgid));
                    setModalInfo({
                        ...modalInfo,
                        opacity: 1,
                        customId: prgid,
                        titleText: '',
                        modalTextfirst: '삭제 했습니다.',
                    });
                }).catch(err => {
                    console.error(err);
                });
                
                break;
            default:
                return 0;
        }
    };

    // 모달 닫았을 때
    const onClose = () => {
        setModalInfo({
            opacity: 0,
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
                {chart.length === 0
                ? 
                    <AddMessageBox> 커스텀 환경이 없습니다. '환경 추가'에서 커스텀 환경을 추가해주세요! </AddMessageBox>
                :   customChart.map((ch,index) =>
                        <div key={index}>
                                <CustomGraphStyle>
                                <GraphTitle>- {ch.prg_name} -</GraphTitle>
                                <LineChart chartData={ch.data}/>
                                <p style={{userSelect: 'none'}}>사용 횟수 : {ch.prg_count}</p>
                                <CustomStart 
                                    onStart={onStart}
                                    onRemove={onRemove} 
                                    prgid={ch.prg_id}
                                    macid={machineId} />
                            </CustomGraphStyle>
                        </div>
                    )
                }
                
                <Modal opacity={modalInfo.opacity} customId={modalInfo.customId} onClose={onClose} width='500' height='200'>
                    <ModalTitleBox>{modalInfo.titleText}</ModalTitleBox>
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