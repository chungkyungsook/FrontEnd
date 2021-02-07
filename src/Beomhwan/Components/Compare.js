import React,{useState, useRef} from 'react';
import styled from 'styled-components';
import { flexAlign } from '../../Util/css';
import {NotoSansRegular} from '../css/cssModule';
import {Line} from 'react-chartjs-2';

const CompareBox = styled.div`
    width: 100%;
    height: 100%;
    ${flexAlign};
    flex-direction: row;
`;

const GraphBox = styled.div`
    flex: 4;
    height: 100%;
    padding: 20px;
`;

const DescriptionBox = styled.div`
    flex: 2;
    height: 100%;
    border-left: 1px solid gray;
    ${flexAlign};
    flex-direction: column;
`;

const TitleBox = styled.div`
    ${NotoSansRegular}
    width: 100%;
    font-size: 1.2em;
    flex: 1;
    border-bottom: 1px solid gray;
    ${flexAlign};
`;

const KinokoBox = styled.div`
    width: 100%;
    flex: 4;
    border-bottom: 1px solid gray;
    ${flexAlign};
`;

const CardBox = styled.div`
    width: 170px;
    height: 150px;
    border: 1px solid gray;
    margin: 20px;
    ${flexAlign};
    flex-direction: column;
`;

const CardTitle = styled.div`
    ${flexAlign};
    flex: 1;
`;

const CardContent = styled.div`
    ${flexAlign};
    flex: 3;
    font-size: 1.5em;
`;

const ExtraInfoBox = styled.div`
    width: 100%;
    flex: 2;
`;

const options = {
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
}

const LineChart = ({data}) => {
    const ChartRef = useRef(null);

    return <Line data={data} opitons={options} ref={ChartRef}/>
}

const Compare = ({goSlide, chart}) => {
    const [viewId, setViewId] = useState(0);
    console.log(chart);

    const NextView = () => {
        viewId === chart.length-1 ? setViewId(chart.length-1) : setViewId(viewId + 1);
    }

    const PreviewView = () => {
        viewId === 0 ? setViewId(0) : setViewId(viewId - 1);
    }

    return (
        <CompareBox>
            {chart.length !== 0 ? 
            <>
            <GraphBox>
                <LineChart data={chart[viewId].data} />
            </GraphBox>
            <DescriptionBox>
                <TitleBox>- {chart[viewId].prg_name} -</TitleBox>
                <KinokoBox>
                    <CardBox>
                        <CardTitle>수확한 버섯 수</CardTitle>
                        <CardContent>N개</CardContent>
                    </CardBox>
                    <CardBox>
                        <CardTitle>생장 종료일</CardTitle>
                        <CardContent>{chart[viewId].data.labels.length}일차</CardContent>
                    </CardBox>
                </KinokoBox>
                <ExtraInfoBox>
                    <button onClick={goSlide}>뒤로 가기</button>
                    <button onClick={PreviewView}>전</button>
                    <button onClick={NextView}>다음</button>
                </ExtraInfoBox>
            </DescriptionBox>
            </>
            : <>
                체크 된 커스텀 항목이 없습니다!
                <button onClick={goSlide}>체크하러 가기</button>
              </>}
        </CompareBox>
    );
}

export default Compare;