import React, {useRef} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';

// 차트 데이터
const CustomData={
    labels: ['1일차', '2일차', '3일차', '4일차', '5일차'],
    datasets: [
        {
            label: "Temperature",
            data: [20,24,23,22,24],
            fill: false,
            borderColor: 'red'
        }
    ]
};

// 차트 옵션
const CustomOptions={
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                max: 40,
                stepSize: 10
            }
        }]
    }
};

// 커스텀할 차트
const CustomChart = () => {
    const LineChartRef = useRef();

    console.dir(LineChartRef);

    return <Line ref={LineChartRef} data={CustomData} options={CustomOptions}/>;
}

// 전체 박스
const CustomAddDiv = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
`;

// -------------------커스텀에서 선택한 환경-------------------
const SelectedCustom = styled.div`
    padding: 10px;
    flex: 1;
    height: 45vh;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    display: flex;
`;

// 선택된 환경이 없을 경우 렌더링될 div
const NoGraphSelected = styled.div`
    margin: auto;
    flex: 0.4;
    height: 100px;
    font-size: 1.4em;
    text-align: center;
    line-height: 100px;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(0,0,0,0.4);
`;

// 그래프 설정 박스
const DrawGraphBox = styled.div`
    padding: 10px;
    flex: 1.5;
    height: 45vh;
`;
//-----------------------------------------------------------

// -------------------추가 설정 및 등록 박스-------------------
const SettingBoxStyled = () => {
    // 전체 div
    const SettingBox = styled.div`
        flex: 1;
        height: 45vh;
        display: flex;
        flex-direction: column;
    `;

    // 온, 습도 체크, 날짜, 물주기, 햇빛, 이름 세팅을 감싸는 div
    const CheckBox = styled.div`
        flex: 3;
        display: flex;
        flex-direction: row;
    `;

    // 온, 습도 체크 div
    const CheckMenu = styled.div`
        flex: 1;
        border: 1px solid gray;
        padding: 10px;
    `;

    // 날짜, 물주기, 햇빛 세팅 div
    const Menu2 = styled.div`
        flex: 2;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
    `;

    // 날짜 세팅 div
    const SetDate = styled.div`
        flex: 1;
        border: 1px solid gray;
        padding: 10px;
    `;

    // 물주기, 햇빛 세팅 div
    const SetWaterSun = styled.div`
        flex: 2;
        border: 1px solid gray;
        padding: 10px;
    `;

    // 커스텀 환경 이름 세팅 div
    const SettingName = styled.div`
        flex: 1;
        border: 1px solid gray;
        padding: 10px;
    `;
    return (
        <SettingBox>
            <CheckBox>
                <CheckMenu>온, 습도 체크박스 표시</CheckMenu>
                <Menu2>
                    <SetDate>날짜 지정</SetDate>
                    <SetWaterSun>물주기, 햇빛 횟수 지정</SetWaterSun>
                </Menu2>
            </CheckBox>
            <SettingName>커스텀 환경 이름 지정 및 추가 버튼 표시</SettingName>
        </SettingBox>
    );
}
// ---------------------------------------------------------

const Add = () => {
    return (
        <>
            <CustomAddDiv>
                <SelectedCustom>
                    <NoGraphSelected>
                            현재 커스텀에서 선택된 환경이 없습니다.
                    </NoGraphSelected>
                </SelectedCustom>
            </CustomAddDiv>
            <CustomAddDiv>
                <DrawGraphBox><CustomChart/></DrawGraphBox>
                <SettingBoxStyled/>
            </CustomAddDiv>
        </>
    );
};

export {Add, SettingBoxStyled};