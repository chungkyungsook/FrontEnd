import React, {useRef, useEffect, memo, useState} from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import Modal from '../Components/Modal';
import {flexAlign} from '../../Util/css';
import {NotoSansLight, NotoSansRegular} from '../css/cssModule';
import ModalContent from '../Components/ModalContent';

const data = {
    labels: ['1일차','2일차','3일차','4일차','5일차'],
    datasets: [
    {
        label: 'Temperature',
        data: [25, 25, 25, 25, 25],
        fill: true,
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.2)'
    },
    {
        label: 'Humidity',
        data: [80, 80, 80, 80, 80],
        fill: false,
        borderColor: 'blue',
    }
    ]
};

const options = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                ticks: {    
                    beginAtZero: true,
                    max: 100,
                    stepSize: 10,
                }
            }
        ]
    }
};

export const Chart = () => {
    const ChartRef = useRef();

    return(
        <Line data={data} options={options} ref={ChartRef} />
    );
};

const PyogoStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const PyogoGraphBox = styled.div`
    padding: 30px;
    flex: 5;
    border-bottom: 1px solid gray;
`;

const FooterBox = styled.div`
    padding: 30px;
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const Description = styled.div`
    flex: 9;
    text-align: center;
`;

const GrowStartBox = styled.div`
    padding: 30px;
    flex: 1;
    display: flex;
`;

const GrowStartButton = styled.button`
    flex: 1;
    outline: none;
    border-radius: 10px;
    border: 3px solid rgba(0,0,0,0.4);
    background: none;
    &:hover{
        background: beige;
    }
    transition: 0.3s;
    cursor: pointer;
`;

const ModalOnButton = ({onModal}) => {
    return (
        <GrowStartButton onClick={onModal}>
            적용
        </GrowStartButton>
    )
} 

const Pyogo = () => {
    const [opacity, setOpacity] = useState(0);
    const PyogoModalText = {
        title: '주의',
        caution1: '설정하시면 도중에 환경 변경이 불가능합니다.',
        caution2: '재배를 시작하시겠습니까?',
        waterText: '물 주기 횟수 : ',
        sunText: '채광 횟수 : '
    }

    const onModal = () => {
        setOpacity(1);
    };

    const onClose = () => {
        setOpacity(0);
    };

    return (
        <PyogoStyled>
            <Modal opacity={opacity} onClose={onClose}>
                <ModalContent chartname='pyogo' text={PyogoModalText} onClose={onClose}/>
            </Modal>
            <PyogoGraphBox>
                <Chart />
            </PyogoGraphBox>
            <FooterBox>
                <Description>
                    표고버섯은 일정한 생장 환경을 제공합니다.
                </Description>
                <GrowStartBox>
                    <ModalOnButton onModal={onModal}>적용</ModalOnButton>
               </GrowStartBox>
            </FooterBox>
        </PyogoStyled>
    );
};

export default Pyogo;