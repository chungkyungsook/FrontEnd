import React, {useRef, useEffect, memo, useState} from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import Modal from '../Components/Modal';
import {flexAlign} from '../../Util/css';
import {BoxShadowTrick} from '../css/cssModule';
import ModalContent from '../Components/ModalContent';
import PyogoTimeLine from '../Components/PyogoTimeLine';

const data = {
    labels: ['1일차','2일차','3일차','4일차','5일차','6일차','7일차','8일차','9일차','10일차','11일차','12일차','13일차','14일차'],
    datasets: [
        {
            label: '온도',
            data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,],
            fill: false,
            borderColor: '#EC5858',
        },
        {
            label: '습도',
            data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, ],
            fill: false,
            borderColor: '#00BCD4',
        }
    ]
};

const options = {
    response: true,
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        position: 'nearest'
    },
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
    height: 500px;
    border-bottom: 1px solid gray;
`;

const FooterBox = styled.div`
    padding: 30px;
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
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: 3px solid #dddddd;
    background-color: white;
    transition: 0.3s;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    ${BoxShadowTrick};
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
        title: '표고버섯 환경 프로그램 적용',
        caution1: `
            일정한 환경에서 표고버섯 재배를 실시합니다.
            물 주는 횟수는 8시간에 1회 입니다.
        `,
        caution2: '재배를 시작하시겠습니까?',
        waterText: '물 주기 횟수 : 3회',
        sunText: '채광 횟수 : 0회'
    }

    const onModal = () => {
        setOpacity(1);
    };

    const onClose = () => {
        setOpacity(0);
    };

    return (
        <PyogoStyled>
            <Modal opacity={opacity} customId='0' onClose={onClose}>
                <ModalContent chartname='pyogo' text={PyogoModalText} onClose={onClose}/>
            </Modal>
            <PyogoGraphBox>
                <Chart />
            </PyogoGraphBox>
            <FooterBox>
                <Description>
                    <PyogoTimeLine />
                </Description>
                <GrowStartBox>
                    <ModalOnButton onModal={onModal}>적용</ModalOnButton>
               </GrowStartBox>
            </FooterBox>
        </PyogoStyled>
    );
};

export default Pyogo;