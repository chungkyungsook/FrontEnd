import React,{useState, useRef, useLayoutEffect, useEffect} from 'react';
import styled from 'styled-components';
import { flexAlign } from '../../Util/css';
import {NotoSansRegular} from '../css/cssModule';
import {Line} from 'react-chartjs-2';

const options = {
    response: true,
    maintainAspectRatio: false,
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
    },
};

const ContainerBox = styled.div`
    width: 1500px;
    height: calc(45vh - 70px);
    overflow: hidden;
`;

const CompareListBox = styled.div`
    float:left;
    width: ${props => props.width}px;
    height: 100%;
    transition-duration: 0.5s;
    transform: translate3d(-${props => props.x}px, 0, 0);
`;

const ChartBox = styled.div`
    flex: 4;
    height: 100%;
    border-right: 1px solid gray;
`;

const DescriptionBox = styled.div`
    flex: 2;
    height: 100%;
    ${flexAlign};
    flex-direction: column;
`;

const CompareBox = styled.div`
    float: left;
    width: 1500px;
    height: 100%;
    ${flexAlign}
`;

const CardFlex = styled.div`
    ${flexAlign};
    flex-direction: row;
`;

const CardBox = styled.div`
    width: 170px;
    height: 150px;
    border: 1px solid gray;
    margin: 20px;
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

const LineChart = ({data}) => {
    console.log(data);
    return <Line data={data} options={options} />
};

const Compare = ({goSlide, chart}) => {
    console.log(chart);
    const [slideInfo, setSlideInfo] = useState({
        chartSize: 1500,
        width: 0,
        x: 0,
        count: 0
    });

    useEffect(() => {
        setSlideInfo({...slideInfo, width: 1500 * chart.length});
    }, []);

    const onNext = () => {
        slideInfo.count < chart.length - 1
        ? setSlideInfo({
            ...slideInfo,
            x: slideInfo.x + 1500,
            count: ++slideInfo.count
        })
        : setSlideInfo({...slideInfo, count: chart.length-1});
    };

    const onPreview = () => {
        
        slideInfo.count > 0
        ? setSlideInfo({
            ...slideInfo, 
            count: --slideInfo.count,
            x: slideInfo.x - 1500
        })
        : setSlideInfo({...slideInfo, count: 0}) 
        
    };

    return (
        <ContainerBox>
            {chart.length !== 0 ? 
            <>
            <CompareListBox width={slideInfo.width} x={slideInfo.x}>
                {chart.map((ch,i) => 
                    <CompareBox>
                        <ChartBox>
                            <LineChart data={ch.data} />
                        </ChartBox>
                        <DescriptionBox>
                            <TitleBox>
                                - {ch.prg_name} -
                            </TitleBox>
                            <CardFlex>
                                <CardBox>
                                    <CardTitle>수확한 버섯 수</CardTitle>
                                    <CardContent>N개</CardContent>
                                </CardBox>
                                <CardBox>
                                    <CardTitle>총 재배일</CardTitle>
                                    <CardContent>{ch.data.labels.length}일차</CardContent>
                                </CardBox>
                            </CardFlex>
                            <ExtraInfoBox>
                                <button onClick={goSlide}>뒤로</button>
                                <button onClick={onPreview}>전</button>
                                <button onClick={onNext}>다음</button>
                                햇빛{ch.prg_sunshine}
                                물{ch.prg_water}
                            </ExtraInfoBox>
                        </DescriptionBox>    
                    </CompareBox>
                )}
            </CompareListBox>
            </>
            : 
            <>
                체크 된 리스트가 없습니다.
                <button onClick={goSlide}>체크하러 가기</button>
            </>
            }
        </ContainerBox>
    )
}

export default Compare;