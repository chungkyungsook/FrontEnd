import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import Modal from '../Components/Modal';
import ModalContent from '../Components/ModalContent';
import {flexAlign} from '../../Util/css';
import BaekhwagoTimeline from '../Components/BaekhwagoTimeline';
import {BoxShadowTrick} from '../css/cssModule';

// 백화고차트 데이터
const BaekhwagoData = {
    labels: ['1단계','2단계','3단계','4단계','5단계'],
    datasets: [
        {
            label: '일출 후 온도',
            data: [20, 20, 17, 15, 15],
            fill: false,
            borderColor: '#FB9300'
        },
        {
            label: '일몰 후 온도',
            data: [20, 15, 13, 10, 5],
            fill: false,
            borderColor: '#D83A56'
        },
        {
            label: '습도',
            data: [90, 70, 60, 50, 40],
            fill: false,
            borderColor: '#00BCD4'
        }
    ]
};

// 백화고차트 옵션
const BaekhwagoOptions = {
    response: true,
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        position: 'nearest'
    },
    scales: {
        yAxes: [{
            ticks:{
                beginAtZero: true,
                max: 100,
                stepSize: 10,
            }
        }]
    }
};

// 백화고 chart
export const BaekhwagoChart = () => {
    const ChartRef = useRef();

    return <Line ref={ChartRef} data={BaekhwagoData} options={BaekhwagoOptions} />;
};

// 전체를 감쌀 div
const FullBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const BaekhwagoGraphBox = styled.div`
    height: 500px;
    padding: 30px;
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
    height: 600px;
`;

const DescriptionTitle = styled.div`
    flex: 1;
    height: 100%;
`;

const DescriptionContent = styled.div`
    flex: 3;
    height: 100%;
    ${flexAlign};
`;

const GrowStartButtonBox = styled.div`
    flex: 1;
    padding: 30px;
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

const Baekhwago = () => {
    const [opacity, setOpacity] = useState(0);
    const BaekhwaText = {
        title: '주의',
        caution1: '설정하시면 도중에 환경 변경이 불가능합니다.',
        caution2: '재배를 시작하시겠습니까?',
        waterText: '물 주기 횟수 : ',
        sunText: '채광 횟수 : '
    }

    const onModal = () => {
        setOpacity(1);
    }

    const onClose = () => {
        setOpacity(0);
    }
    
    return (
        <FullBox>
            <Modal opacity={opacity} customId="0" onClose={onClose}>
                <ModalContent chartName='baekhwa' text={BaekhwaText} onClose={onClose}/>
            </Modal>
            <BaekhwagoGraphBox>
                <BaekhwagoChart/>
            </BaekhwagoGraphBox>
            <FooterBox>
                <Description>
                    <BaekhwagoTimeline />
                </Description>
                <GrowStartButtonBox>
                    <GrowStartButton onClick={onModal}>적용</GrowStartButton>
                </GrowStartButtonBox>
            </FooterBox>
        </FullBox>
    );
};

export default Baekhwago;