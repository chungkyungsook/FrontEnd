import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import { Line } from 'react-chartjs-2';
import styled, {css} from 'styled-components';
import { flexAlign } from '../../Util/css';
import Compare from './Compare';
import {getCustomProgramList} from '../api';
import { setChartjsDataset } from '../Util';
import {FcCheckmark} from 'react-icons/fc';
import {GrPrevious, GrNext} from 'react-icons/gr';
import { BoxShadowTrick } from '../css/cssModule';

const SlideIconCss = css`
    width: 30px;
    height: 30px;
    color: '#DDDDDD';
`;

const CheckIcon = styled(FcCheckmark)`
    opacity: ${p => p.opacity ? 1 : 0};
    width: 30px;
    height: 30px;
    transition: opacity ease-in 0.1s;
`;

const PreviousIcon = styled(GrPrevious)`
    ${SlideIconCss};
`;

const NextIcon = styled(GrNext)`
    ${SlideIconCss};
`;

const CompareBox = styled.div`
    ${flexAlign};
    width: 100%;
    height: 400px;
    overflow: hidden;
`;

// 차트의 전체 div
const ChartContainer = styled.div`
    width: ${p=>p.width}px;
    height: 400px;
    transition-duration: 0.5s;
    transform: translate3d(-${props => props.x}px,0,0);
`;

// 차트 리스트 박스 div
const ChartListBox = styled.div`
    width: ${props => props.width}px;
    height: 400px;
    overflow: hidden;
`;

// 차트 하나의 크기 div
const ChartContentBox = styled.div`
    float: left;
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: ${p=>p.toggle ? '2px solid #7FDBDA' : '2px solid #dddddd'};
    margin: 0 10px 0 10px;
    border-radius: 0 20px 0 20px;
    position: relative;
`;

const ChartStyle = styled.div`
    flex: 3;
`;

const ChartDescription = styled.div`
    flex: 1;
`;

const ControlButton = styled.button`
    background-color: white;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    border: 1px solid #dddddd;
    color: #dddddd;
    cursor: pointer;
    margin: 0 5px 10px 5px;
    &:focus{
        outline: none;
    }
    ${BoxShadowTrick};
`;

const RadioButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: ${p=>p.toggle ? '2px solid #7FDBDA' : '2px solid #dddddd'};
    ${flexAlign}
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 368px;
    background-color: white;
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

const ProgramTitle = styled.p`
    text-align: center;
    font-size: 1.4em;
`;

const CountContainer = styled.div`
    width: 100px;
    height: 40px;
    position: absolute;
    top: 10px;
    left: 10px;
`;

const ControlContainer = styled.div`
    ${flexAlign};
    flex-direction: column;
`;

const SlideControlContainer = styled.div`
    ${flexAlign};
`;

const DetailButton = styled.button`
    width: 100px;
    height: 40px;
    font-weight: bold;
    background-color: white;
    border: 1px solid #D8E3E7;
    border-radius: 5px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    ${BoxShadowTrick};
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

const ChartInstance = ({chartData}) => {

    return (
        <Line data={chartData} options={options} />
    )
}

const ChartSilder = () => {
    const [slideInfo, setSlideInfo] = useState({
        width: 840, // 차트 전체 길이용 변수
        chartLength: 0,
        x: 0, // x좌표
        chartSize: 0, // 차트 사이즈용 변수
    });
    const slideCount = useRef(0);
    const [chart, setChart] = useState([]); // 전체 커스텀 차트 정보
    const [detailChart, setDetailChart] = useState([]); // 상세 비교로 넘길 차트 배열
    const [slideOpacity, setSlideOpacity] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // get chart data
        getCustomProgramList()
        .then(res => {
            // api 데이터 가져왔고
            return res.data;
        })
        .then(async ch => {
            await ch.forEach( async data => {
                    console.log('실행했엉')
                // if(data.prg_count > 0) {
                    // chartjs 양식에 맞추기 위한 배열들 선언
                    let dateArr = [];   // 날짜
                    let tempArr = [];   // 온도
                    let humiArr = [];   // 습도
                    let growthArr = []; // 생장률
                    
                    // 온도 데이터
                    data.temperature.forEach((temp,index) => {
                        dateArr.push((index + 1) + "일차");
                        tempArr.push(temp.setting_value);
                    });
                    // 습도 데이터
                    data.humidity.forEach(humi => {
                        humiArr.push(humi.setting_value);
                    });
                    // 생장률 데이터
                    data.growthRate.forEach(growth => {
                        growthArr.push(growth.gr_value);
                    });
                    // chartjs 데이터셋 생성
                    await setChart(
                        ch =>
                        ch.concat(
                            {
                                prg_id: data.id,
                                prg_name: data.prg_name,
                                prg_count: data.prg_count,
                                prg_water: data.prg_water,
                                prg_sunshine: data.prg_sunshine,
                                toggle: false,
                                data: setChartjsDataset(dateArr, tempArr, humiArr, growthArr)
                            }
                        )
                    );
                // }
            });
            setSlideInfo({
                ...slideInfo,
                width: ch.length * 420,
                chartLength: ch.length,
                chartSize: 840
            });
        }).then(() => {
            setLoading(false);
        })
    }, []);

    // x축 슬라이드 설정 -> 왼쪽으로
    const onLeft = () => {
        if(slideInfo.x < 1) {
            slideCount.current = 0;    
        } else {
            slideCount.current -= 1;
            setSlideInfo({...slideInfo, x: slideInfo.x - 840});
        }
        console.log(slideInfo.x);
        console.log(slideCount.current);
    };

    // x축 슬라이드 설정 -> 오른쪽으로
    const onRight = () => {
        if(slideCount.current < (slideInfo.chartLength / 2) - 1) {
            slideCount.current += 1;
            setSlideInfo({...slideInfo, x: slideInfo.x + 840});
        };
        console.log(slideInfo.x);
        console.log(slideCount.current);
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
    
    if(loading)
        return <>Loading...</>

    if(chart.length === 0) 
        return (
            <NoGraphSelected>
                현재 생성된 커스텀 그래프가 없습니다!
            </NoGraphSelected>
        );

    return (
        <CompareBox>
        {slideOpacity
            ?
                <>
                <ChartListBox width={slideInfo.chartSize}>
                    <ChartContainer width={slideInfo.width} x={slideInfo.x}>
                        {chart.map((ch, index) => 
                        <ChartContentBox toggle={ch.toggle} key={index}>
                            <ChartDescription>
                            <ProgramTitle>- {ch.prg_name} -</ProgramTitle>
                            <CountContainer>{ch.prg_count}회 사용</CountContainer>
                            <RadioButton toggle={ch.toggle} onClick={() => onToggle(ch.prg_id)}>
                                <CheckIcon opacity={ch.toggle} />
                            </RadioButton>
                            </ChartDescription>
                            <ChartStyle>
                                <ChartInstance chartData={ch.data}/>
                            </ChartStyle>
                        </ChartContentBox>
                        )}
                    </ChartContainer>
                </ChartListBox>
                <ControlContainer>
                    <SlideControlContainer>
                        <ControlButton onClick={onLeft}><PreviousIcon /></ControlButton>
                        <ControlButton onClick={onRight}><NextIcon /></ControlButton>
                    </SlideControlContainer>
                    <DetailButton onClick={changeComponent}>상세</DetailButton>
                </ControlContainer>
                </>
            : 
            <>
                <Compare goSlide={changeComponent} chart={detailChart} />
            </>
        }
        </CompareBox>
    );
};


export default ChartSilder;