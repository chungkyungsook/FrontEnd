import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import {CustomChart as UpdateCustomChart, Select, SettingBox, Button, LogBox, CheckBox, CheckMenu, Menu2, SetDate, SetWaterSun, SettingName} from './Add';
import {useCustomUpdateInfo, setChartjsDataset} from '../ChartContext';
import axios from 'axios';
import * as Description from '../Components/Compare';
import {withCookies} from 'react-cookie';

// ------------------------지금까지의 환경 그래프------------------------

const RanCustomOptions = {
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

const RanCustomChart = ({data}) => {
    const LineChart = useRef();

    console.dir(LineChart);

    return <Line ref={LineChart} data={data} options={RanCustomOptions} />
}
// --------------------------------------------------------------------


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

// -----------------지금까지 실행되었던 커스텀 환경 정보 스타일-----------------
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
// -------------------------------------------------------------------------

const DrawGraph = styled.div`
    padding: 10px;
    flex: 1.5;
    height: 45vh;
`;

class MyError extends Error {
    constructor(errorName, ...params) {
        super(...params);
        this.name = errorName;
    }
}

const Update = ({cookies}) => {
    const updateChartInfo = useCustomUpdateInfo();
    console.log(updateChartInfo);
    if(updateChartInfo === {}) {
        alert('현재 진행중인 프로그램이 없습니다!');
        window.location.href='http://localhost:3000/setting';
    }
    const [loading, setLoading] = useState(1);
    const [compareChart, setCompareChart] = useState({});
    const today = useRef(updateChartInfo.date + 1);
    const [data, setData] = useState([{
        Date: today.current + '일차',
        Temperature: 20,
        Humidity: 80
    }]);
    const dateLimit = updateChartInfo.date;

    useEffect(() => {
        let date = [];
        let temp = [];
        let humi = [];
        let grow = [];
        console.log(updateChartInfo);

        updateChartInfo.res.humidity.map((ch,i) => {
            date.push((i + 1) + '일차');
            temp.push(updateChartInfo.res.temperature[i].setting_value);
            humi.push(ch.setting_value);
            grow.push(updateChartInfo.res.growthRate[i].gr_value);
        });
        setCompareChart(setChartjsDataset(date, temp, humi, grow));
        setTimeout(() => setLoading(0),2000);
    },[]);

    // 1일 추가
    const Add = () => {
        today.current += 1;
        let addData = {
            Temperature: 20,
            Humidity: 80,
            Date: today.current + "일차"
        };

        setData(chartData => chartData.concat(addData));
        
        console.dir(data);
    };

    // 1일 빼기
    const Remove = () => {
        setData(
            data.filter(ch => ch.Date !== today.current + "일차")
        );
        today.current > dateLimit ? today.current -= 1 : today.current = dateLimit; // 지정된 일차에 맞춰서
        console.dir(data);
    };

    const [count, setCount] = useState({
        sunCount: 0,
        waterCount: 1
    });

    const sunChange = (e) => {
        switch(e) {
            case '+' :
                count.sunCount < 5 
                    ? setCount({...count, sunCount: count.sunCount + 1})
                    : setCount({...count, sunCount: 5});
                break;
            case '-' :
                count.sunCount > 0
                    ? setCount({...count, sunCount: count.sunCount - 1})
                    : setCount({...count, sunCount: 0});
                break;
            default :
                break;
        };
    };

    const waterChange = (e) => {
        switch(e) {
            case '+' :
                count.waterCount < 10 
                    ? setCount({...count, waterCount: count.waterCount + 1})
                    : setCount({...count, waterCount: 10});
                break;
            case '-' :
                count.waterCount > 1
                    ? setCount({...count, waterCount: count.waterCount - 1})
                    : setCount({...count, waterCount: 1});
                break;
            default :
                break;
        };    
    };

    function onSubmit() {
        // http://54.210.105.132/api/farm/period/extend
        try{
            const prgId = updateChartInfo.id;
            let temp = [];
            let humi = [];
            let token = cookies.get('token');
            let period = data.length;
            data.map(ch => {
                if(ch.Temperature > 27) {
                    throw new MyError('TempErrorUp');
                }
                else if(ch.Temperature < 17) {
                    throw new MyError('TempErrorDown');
                }
                temp.push(ch.Temperature);
                humi.push(ch.Humidity);
            });

            console.log(temp, humi);
            console.log(period);
            console.log(token);
            console.log(prgId);
            console.log(count);

            axios.put('http://54.210.105.132/api/farm/period/extend', {
                    id: prgId,
                    token: token,
                    period: period,
                    temps: temp,
                    humis: humi,
                    water: count.waterCount,
                    sunshine: count.sunCount
            }).then(res => {
                console.log(res);
            })

        }catch(e) {
            if(e.name === 'TempErrorUp') {
                alert('온도 제한 27도를 넘었습니다!');
            } 
            else if(e.name === 'TempErrorDown') {
                alert('온도 제한 17도보다 낮습니다!');
            }
        }
    }

    return (
        <>
        {loading ? 
        <> Now Loading... </> 
        :
        <>
            <CustomUpdateDivColumn>
                <UpdateGraphBox>
                    <RanEnvironmentGraph>
                        {loading 
                        ? <>Now Loading...</>
                        : <RanCustomChart data={compareChart}/>
                        }
                    </RanEnvironmentGraph>
                    <RanEnvironmentInfo>
                        <Description.DescriptionBox>
                            <Description.TitleBox>
                                - {updateChartInfo.prg_name} -
                            </Description.TitleBox>
                            <Description.CardFlex>
                                <Description.CardBox>
                                    <Description.CardTitle>수확한 버섯 수</Description.CardTitle>
                                    <Description.CardContent>{}개</Description.CardContent>
                                </Description.CardBox>
                                <Description.CardBox>
                                    <Description.CardTitle>총 재배일</Description.CardTitle>
                                    <Description.CardContent>{}일차</Description.CardContent>
                                </Description.CardBox>
                            </Description.CardFlex>
                            <Description.ExtraInfoBox>
                                햇빛 {updateChartInfo.res.sunshine} 회
                                물 {updateChartInfo.res.water} 회
                            </Description.ExtraInfoBox>
                        </Description.DescriptionBox> 
                    </RanEnvironmentInfo>
                </UpdateGraphBox>
            </CustomUpdateDivColumn>
            <CustomUpdateDivRow>
                <DrawGraph>
                    <UpdateCustomChart Data={data} titleMsg={'그래프를 업데이트 해보자!'}/>
                </DrawGraph>
                <SettingBox>
                <CheckBox>
                    <CheckMenu>
                        {data.map(ch => {
                            if(ch.Temperature > 27)
                                return <LogBox>{ch.Date} 온도가 27도 이상입니다!</LogBox>
                            else if(ch.Temperature < 17)
                                return <LogBox>{ch.Date} 온도가 17도 이하입니다!</LogBox>
                        })}
                    </CheckMenu>
                    <Menu2>
                        <SetDate>
                            <Button onClick={Add}>1일 추가</Button>
                            <Button onClick={Remove}>1일 제거</Button>
                        </SetDate>
                        <SetWaterSun>
                            <Select 
                                count={count} 
                                sunChange={sunChange} 
                                waterChange={waterChange} 
                            />
                        </SetWaterSun>
                    </Menu2>
                </CheckBox>
                    <SettingName>
                        <Button onClick={onSubmit}>적용하기</Button>
                    </SettingName>
                </SettingBox>
            </CustomUpdateDivRow>
        </>
        }
        </>
    );
};

export default withCookies(Update);