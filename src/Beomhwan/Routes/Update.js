import React, {useRef} from 'react';
import styled from 'styled-components';
import {SettingBoxStyled} from './Add';
import {Line} from 'react-chartjs-2';

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
    background: blue;
    display: flex;
    flex-direction: row;
`;

const RanEnvironmentGraph = styled.div`
    flex: 2;
    background: red;
`;

const RanEnvironmentInfo = styled.div`
    flex: 1;
    background: green;
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
                    <RanEnvironmentGraph/>
                    <RanEnvironmentInfo>

                    </RanEnvironmentInfo>
                </UpdateGraphBox>
            </CustomUpdateDivColumn>
            <CustomUpdateDivRow>
                <DrawGraph>
                    <UpdateCustomChart/>
                </DrawGraph>
                <SettingBoxStyled/>
            </CustomUpdateDivRow>
        </>
    );
};

export default Update;