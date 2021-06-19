import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import {
    useMachineInfo
} from '../ChartContext';
import Modal from '../Components/Modal';
import axios from 'axios';
import {Button, ModalTitleBox, ModalTextBox, ModalFooter} from '../Components/ModalContent';
import {URL, setChartjsDataset} from '../Util';
import {flexAlign} from '../../Util/css';
import {getCustomProgramList} from '../api';

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
    border-radius: 0 10px 0 10px;
    margin: 2vw 0 2vw 2vw;
    width: 400px;
    height: auto;
    border: 1px solid #BBBBBB;
    flex-wrap: wrap;
    align-items: center;
    transition: 0.5s;
    box-shadow: 5px 5px 5px #DDDDDD;
    background-color: white;
    position: relative;
`;

// 커스텀 환경 프로그램 이름
const GraphTitle = styled.div`
    user-select: none;
    height: 60px;
    font-size: 1.2em;
    text-align: center;
    line-height: 60px;
    border-radius : 10px;
    border-bottom: 1px solid #BBBBBB;
    transition: 0.5s;
`;

// 커스텀 환경 적용 버튼
const CustomButton = styled.button`
    width: 100px;
    height: 40px;
    border: 1px solid #BBBBBB;
    background-color: white;
    position: relative;
    top: 10px;
    left: 199px;
    user-select: none;
    box-shadow: 5px 5px 5px #DDDDDD;
    cursor: pointer;

    &:hover &::after {
        opacity: 1;
    }

    &::after {
        top: 0;
        left: 0;
        width: 100px;
        height: 40px;
        opacity: 0;
        position: absolute;
        background-color: #7FDBDA;
        transition: opacity ease-in 0.3s;
    }
`;

const CustomStart = ({onStart, onRemove, prgid}) => {

    return (
        <>
        <CustomButton onClick={() => onStart(prgid)}>적용</CustomButton>
        <CustomButton onClick={() => onRemove(prgid)}>삭제</CustomButton>
        </>
    );
};

const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const LoadingMessage = styled.p`
    font-size: 1.4em;
    text-align: center;
`;

// 커스텀 컴포넌트
const Custom = () => {
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
        // get chart data
        getCustomProgramList()
        .then(res => {
            // api 데이터 가져왔고
            let da = res.data;
            return da;
        })
        .then(async ch => {
            await ch.forEach(data => {
                // chartjs 양식에 맞추기 위한 배열들 선언
                let dateArr = [];   // 날짜
                let tempArr = [];   // 온도
                let humiArr = [];   // 습도
                let growthArr = []; // 생장률
                
                // 온도 데이터
                data.temperature.forEach((temp,index) => {
                    dateArr.push((index + 1) + "일차");
                    tempArr.push(temp.setting_value);
                });
                // 습도 데이터
                data.humidity.forEach(humi => {
                    humiArr.push(humi.setting_value);
                });
                // 생장률 데이터
                data.growthRate.forEach(growth => {
                    growthArr.push(growth.gr_value);
                });
                // chartjs 데이터셋 생성
                setCustomChart(
                    ch =>
                    ch.concat(
                        {
                            prg_id: data.id,
                            prg_name: data.prg_name,
                            prg_count: data.prg_count,
                            data: setChartjsDataset(dateArr, tempArr, humiArr, growthArr)
                        }
                    )
                );
            });
        }).then(() => setLoading(false));
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
                // if(prgid === )
                //커스텀 프로그램 적용 put 코드
                axios.put(`${URL}/api/myfarm/program`, {
                    id: macid, //macid
                    prgId: prgid
                }).then(response => {
                    console.log(response);
                    setModalInfo({
                        opacity: 1,
                        customId: prgid,
                        titleText: '',
                        modalTextfirst: '적용 했습니다.',
                        modalTextsecond: '프로그램이 종료 될 때까지 프로그램을 바꿀 수 없으니 주의해주세요.',
                        confirm: ''
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
                        opacity: 1,
                        customId: prgid,
                        titleText: '',
                        modalTextfirst: '삭제 했습니다.',
                        confirm: ''
                    });
                }).catch(err => {
                    console.error(err);
                });
                
                break;
            default:
                setModalInfo({
                    ...modalInfo,
                    opacity: 0
                })
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

    if(loading) return <LoadingContainer><LoadingMessage>loading..</LoadingMessage></LoadingContainer>

    return (
        <CustomBox>
            {customChart.map((ch,index) =>
                <CustomGraphStyle key={index}>
                    <GraphTitle>- {ch.prg_name} -</GraphTitle>
                    <LineChart chartData={ch.data}/>
                    <CountCard>사용 횟수 : {ch.prg_count}</CountCard>
                    <CustomStart 
                        onStart={onStart}
                        onRemove={onRemove} 
                        prgid={ch.prg_id}
                        macid={machineId} />
                </CustomGraphStyle>
            )}
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
    );
};

const CountCard = styled.span`
    user-select: 'none';
    width: 100px;
    height: 30px;
    border: 1px solid #BBBBBB;
    background-color: white;
    position: absolute;
    text-align: center;
    line-height: 30px;
    top: -10px;
    left: -1px;
`;

export default Custom;