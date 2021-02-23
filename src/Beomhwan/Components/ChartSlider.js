import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { flexAlign } from '../../Util/css';
import {useCustomChartInfo, useCustomChartList} from '../ChartContext';
import Compare from './Compare';

const CompareBox = styled.div`
    ${flexAlign};
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

// 차트의 전체 div
const ChartContainer = styled.div`
    width: ${props => props.width}px;
    height: 100%;
    transition-duration: 0.5s;
    transform: translate3d(-${props => props.x}px,0,0);
`;

// 차트 리스트 박스 div
const ChartListBox = styled.div`
    width: ${props => props.width}px;
    height: calc(45vh - 70px);
    overflow: hidden;
    border: 1px solid gray;
`;

// 차트 하나의 크기 div
const ChartContentBox = styled.div`
    float: left;
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
`;

const ChartStyle = styled.div`
    flex: 3;
`;

const ChartDescription = styled.div`
    flex: 1;
`;

const options = {
    responsive: true,
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
    }
};

const LeftButton = styled.button`
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    left: 365px;
    top: 195px;
    &:focus{
        outline: none;
    }
    z-index: 10;
`;

const RightButton = styled.button`
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    right: 195px;
    top: 195px;
    &:focus{
        outline: none;
    }
    z-index: 10;
`;

const RadioButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid gray;
    ${flexAlign}
`;

const CheckedStyle = styled.div`
    display: ${props => props.opacity ? 'block' : 'none'};
    width: 10px;
    height: 10px;
    background-color: aquamarine;
    border-radius: 5px;
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
    user-select: none;
`;

const ChartInstance = ({chartData}) => {

    return (
        <Line data={chartData} options={options} />
    )
}

function DetectDocumentSize() {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function getSize() {
            setWidth(document.documentElement.clientWidth);
        };

        window.addEventListener("resize", getSize);
        getSize();

        return () => window.removeEventListener("resize", getSize);
    }, []);

    return width;
}

const ChartSilder = () => {
    const [slideInfo, setSlideInfo] = useState({
        width: 0, // 차트 전체 길이용 변수
        x: 0, // x좌표
        count: 0, // 슬라이드 관리용 변수
        chartSize: 0, // 차트 사이즈용 변수
        slideNum: 0 // 몇 개씩 넘길지 정할 변수
    });
    const windowSize = DetectDocumentSize(); // 현재 창의 사이즈
    const chartInfo = useCustomChartInfo(); // 커스텀 차트 리스트 정보
    const chartList = useCustomChartList(); // 커스텀 차트 리스트 데이터
    const [chart, setChart] = useState([]); // 전체 커스텀 차트 정보
    const [detailChart, setDetailChart] = useState([]); // 상세 비교로 넘길 차트 배열
    const [slideOpacity, setSlideOpacity] = useState(true);

    console.log(chartInfo);

    useEffect(() => {
        // 종합적인 커스텀 차트 리스트 정보들
        chartInfo.map((ch, index) => {
            ch.prg_count !== 0 &&
            setChart(chart => chart.concat({
                prg_id: ch.id,
                prg_name: ch.prg_name,
                prg_count: ch.prg_count,
                prg_water: ch.prg_water,
                prg_sunshine: ch.prg_sunshine,
                toggle: false,
                data: chartList[index]
            }));    
        });
    }, []);

    useLayoutEffect(() => {
        console.log(windowSize);
        // window 크기에 따른 슬라이더 반응형
        // 1400 ~ => 3개씩
        if(windowSize > 1400) {
            console.log('up');
            setSlideInfo({
                ...slideInfo,
                width: chart.length * 400,
                chartSize: 1200,
                slideNum: 3
            });
        }
        // 1080 ~ 1399 => 2개씩
        else if(windowSize > 1080 && windowSize < 1399) {
            console.log('middle');
            setSlideInfo({
                ...slideInfo,
                width: chart.length * 400,
                chartSize: 800,
                slideNum: 2
            });
        }
        // ~ 1079 => 1개씩
        else{
            console.log('down');
            setSlideInfo({
                ...slideInfo,
                width: chart.length * 400,
                chartSize: 400,
                slideNum: 1
            });
        };
        console.log(chart);
    }, [windowSize]);

    // 해결해야할 문제
    // 화면 리사이즈 시 카운트 초기화 필요

    // x축 슬라이드 설정 -> 왼쪽으로
    const onLeft = () => {
        slideInfo.count === 0 
        ? setSlideInfo({...slideInfo})
        : setSlideInfo({...slideInfo, count: --slideInfo.count});
        switch(slideInfo.slideNum) {
            case 1:
                setSlideInfo({...slideInfo, x: slideInfo.x - 400});
                break;
            case 2:
                setSlideInfo({...slideInfo, x: slideInfo.x - 800});
                break;
            case 3:
                setSlideInfo({...slideInfo, x: slideInfo.x - 1200});
                break;
            default:
                break;
        };
        console.log(slideInfo.count);
    };

    // x축 슬라이드 설정 -> 오른쪽으로
    const onRight = () => {
        if(slideInfo.count < (chart.length / slideInfo.slideNum) - 1) {
            setSlideInfo({...slideInfo, count: ++slideInfo.count});
            console.log(slideInfo.count);
            switch(slideInfo.slideNum) {
                case 1:
                    setSlideInfo({...slideInfo, x: 400 * slideInfo.count});
                    break;
                case 2:
                    setSlideInfo({...slideInfo, x: 800 * slideInfo.count});
                    break;
                case 3:
                    setSlideInfo({...slideInfo, x: 1200 * slideInfo.count});
                    break;
                default:
                    break;
            };
        }
    };

    // toggle checked 확인
    const onToggle = (id) => {
        setChart(chart.map((ch,index) => ch.prg_id === id ? {...ch, toggle: !ch.toggle} : ch));
    }

    // 상세로 넘어가기
    const changeComponent = () => {
        setDetailChart(chart.filter(ch => ch.toggle !== false));

        console.log(detailChart);

        setSlideOpacity(!slideOpacity);
    }


    return (
        <CompareBox>
        {slideOpacity
        ?
        chart.length > 0 ?
        <>
        <LeftButton onClick={onLeft}></LeftButton>
        <ChartListBox width={slideInfo.chartSize}>
            <ChartContainer width={slideInfo.width} x={slideInfo.x}>
                {chart.map((ch, index) => 
                <ChartContentBox key={index}>
                    <ChartStyle>
                        <ChartInstance chartData={ch.data}/>
                    </ChartStyle>
                    <ChartDescription>
                        <p>프로그램 이름 : {ch.prg_name}</p>
                        <p>사용 횟수 : {ch.prg_count}</p>
                        <RadioButton onClick={() => onToggle(ch.prg_id)}>
                            <CheckedStyle opacity={ch.toggle} />
                        </RadioButton>
                    </ChartDescription>
                </ChartContentBox>
                )}
            </ChartContainer>
        </ChartListBox>
        <RightButton onClick={onRight}></RightButton>
        <button onClick={changeComponent}>상세</button>
        </>
        : 
        <NoGraphSelected>
            현재 생성된 커스텀 그래프가 없습니다!
        </NoGraphSelected>

        : <>
        <Compare goSlide={changeComponent} chart={detailChart} />
        </>
        }
        </CompareBox>
    );
};

export default ChartSilder;