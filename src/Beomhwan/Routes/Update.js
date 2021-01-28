import React, {useRef} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import {SettingBox, CheckBox, CheckMenu, Menu2, SetDate, SetWaterSun, SettingName} from './Add';


// ------------------------지금까지의 환경 그래프------------------------
const RanCustomData = {
    labels: ['1일차','2일차','3일차','4일차','5일차','6일차'],
    datasets: [
        {
            label: 'Temperature',
            data: [23, 22, 24, 25, 23, 22],
            fill: false,
            borderColor: 'red'
        },
        {
            label: 'Humidity',
            data: [80, 83, 80, 84, 85, 80],
            fill: false,
            borderColor: 'blue'
        },
        {
            label: 'GrowthRate',
            data: [0, 0, 5, 10, 17, 25],
            fill: false,
            borderColor: 'green'
        }
    ]
};

const RanCustomOptions = {
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

const RanCustomChart = () => {
    const LineChart = useRef();

    console.dir(LineChart);

    return <Line ref={LineChart} data={RanCustomData} options={RanCustomOptions} />
}

// --------------------------------------------------------------------


// ------------------------추가적으로 작업할 그래프------------------------
const UpdateCustomData = {
    labels: ['7일차','8일차','9일차','10일차','11일차'],
    datasets: [
        {
            label: "Temperature",
            data: [23, 24, 20, 22, 23],
            fill: false,
            borderColor: 'red'
        },
        {
            label: "Humidity",
            data: [80, 83, 80, 78, 82],
            fill: false,
            borderColor: 'blue'
        }
    ]
};

const UpdateCustomOptions = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    stepSize: 10
                }
            }
        ]
    }
}

const UpdateCustomChart = () => {
    const LineChart = useRef();

    console.dir(LineChart);

    return <Line ref={LineChart} data={UpdateCustomData} options={UpdateCustomOptions} />
}
// -----------------------------------------------------------------------

// --------------------Div 분할 세팅--------------------
const CustomUpdateDivColumn = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`;

const CustomUpdateDivRow = styled.div`
    width: 100%;
    height: 45vh;
    display: flex;
    flex-direction: row;
`;
// ---------------------------------------------------- 

// -----------------지금까지 실행되었던 커스텀 환경 정보-----------------
const UpdateGraphBox = styled.div`
    height: 45vh;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid gray;
`;

const RanEnvironmentGraph = styled.div`
    flex: 2;
    padding: 20px;
`;

const RanEnvironmentInfo = styled.div`
    flex: 1;
    padding: 20px;
    border-left: 1px solid gray;
`;
// -------------------------------------------------------------------

const DrawGraph = styled.div`
    padding: 10px;
    flex: 1.5;
    height: 45vh;
`;



const Update = () => {
    return (
        <>
            <CustomUpdateDivColumn>
                <UpdateGraphBox>
                    <RanEnvironmentGraph>
                        <RanCustomChart/>
                    </RanEnvironmentGraph>
                    <RanEnvironmentInfo>
                        수확한 버섯의 개수, 설정했던 물주기, 채광 횟수 표시
                    </RanEnvironmentInfo>
                </UpdateGraphBox>
            </CustomUpdateDivColumn>
            <CustomUpdateDivRow>
                <DrawGraph>
                    <UpdateCustomChart/>
                </DrawGraph>
                <SettingBox>
                <CheckBox>
                    <CheckMenu>온, 습도 체크박스 표시</CheckMenu>
                    <Menu2>
                        <SetDate></SetDate>
                        <SetWaterSun>물주기, 햇빛 횟수 지정</SetWaterSun>
                    </Menu2>
                </CheckBox>
                <SettingName>적용 버튼 표시</SettingName>
                </SettingBox>
            </CustomUpdateDivRow>
        </>
    );
};

export default Update;