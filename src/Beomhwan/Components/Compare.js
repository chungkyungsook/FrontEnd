import React,{useState, useRef, useLayoutEffect, useEffect} from 'react';
import styled from 'styled-components';
import { flexAlign } from '../../Util/css';
import {NotoSansRegular} from '../css/cssModule';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
import {Line} from 'react-chartjs-2';
import {getKinoko} from '../CRUD';

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
    width: ${p=>p.width}px;
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
    width: ${p => p.width}px;
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

// const CompareChart = () => {

//     useLayoutEffect(() => {
//         let chart = am4core.create('chartDiv', am4charts.XYChart);


//         return () => {chart.dispose()};
//     }, []);

//     return (
//         <div id='chartDiv' style={{width: '100%', height: '100%'}}></div>
//     );
// }

function useGetClientWidth() {
    function vh(v) {
        let h = Math.max(window.document.documentElement.clientHeight, window.innerHeight || 0);
        return (v * h) / 100;
    }

    console.log('clientSize: ', window.document.documentElement.clientWidth);
    console.log('vhSize: ', vh(20));

    let size = (window.document.documentElement.clientWidth - Math.round(vh(20))) - 40;
    if(size <= 1080) {
        size = (window.document.documentElement.clientWidth - Math.round(vh(20)));
    } else if(size <= 1300) {
        size = (window.document.documentElement.clientWidth - Math.round(vh(20))) - 90;
    }
    return size;
}

const Compare = ({goSlide, chart}) => {

    console.log(chart);
    let [chartData, setChartData] = useState([]);
    const [slideInfo, setSlideInfo] = useState({
        chartSize: 0,
        width: 0,
        x: 0,
        count: 0
    });

    const responsiveWidth = useGetClientWidth();
    console.log('반응형 : ', responsiveWidth);

    useEffect(() => {
        setSlideInfo({...slideInfo, width: responsiveWidth * chart.length});
    }, [responsiveWidth]);

    useEffect(() => {
        setSlideInfo({...slideInfo, width:  responsiveWidth * chart.length});

        chart.map(async (ch,index) => {
            await getKinoko(ch.prg_id)
            .then(data => {
                let chart = {
                    ...ch,
                    kinokoCount: data.length
                }

                setChartData(ch => [...ch, chart]);
            });
        });
    }, []);

    const onNext = () => {
        slideInfo.count < chart.length - 1
        ? setSlideInfo({
            ...slideInfo,
            x: slideInfo.x + responsiveWidth,
            count: ++slideInfo.count
        })
        : setSlideInfo({...slideInfo, count: chart.length-1});
    };

    const onPreview = () => {
        
        slideInfo.count > 0
        ? setSlideInfo({
            ...slideInfo, 
            count: --slideInfo.count,
            x: slideInfo.x - responsiveWidth
        })
        : setSlideInfo({...slideInfo, count: 0}) 
        
    };

    return (
        <ContainerBox width={responsiveWidth}>
            {chart.length !== 0 ? 
            <>
            <CompareListBox width={slideInfo.width} x={slideInfo.x}>
                {chartData.map((ch,i) => 
                    <CompareBox key={i} width={responsiveWidth}>
                        <ChartBox>
                            <LineChart data={ch.data} />
                            {/* <CompareChart /> */}
                        </ChartBox>
                        <DescriptionBox>
                            <TitleBox>
                                - {ch.prg_name} -
                            </TitleBox>
                            <CardFlex>
                                <CardBox>
                                    <CardTitle>수확한 버섯 수</CardTitle>
                                    <CardContent>{ch.kinokoCount}개</CardContent>
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
                <CompareBox style={{flexDirection: 'column'}} width={responsiveWidth}>
                    체크 된 리스트가 없습니다.
                    <button onClick={goSlide}>체크하러 가기</button>
                </CompareBox>
            </>
            }
        </ContainerBox>
    )
}

export default Compare;