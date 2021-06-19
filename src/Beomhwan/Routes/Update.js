import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import {CustomChart as UpdateCustomChart, WarningText, SettingBox, Button, LogBox, CheckBox, CheckMenu, Menu2, SetDate, SetWaterSun, SettingName} from './Add';
import axios from 'axios';
import * as Description from '../Components/Compare';
import { URL, setChartjsDataset } from '../Util';
import {getRunningChartName ,getRunningChartInfo, getKinoko} from '../api';
import Modal from '../Components/Modal';
import {Button as ModalButton, ModalTitleBox, ModalFooter} from '../Components/ModalContent';
import { useKinokoState } from '../../KinokoContext';
import Select from '../Components/Select';


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
const CustomAddDiv = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
`;
// ---------------------------------------------------- 

// -----------------지금까지 실행되었던 커스텀 환경 정보 스타일-----------------
const UpdateGraphBox = styled.div`
    width: 100%;
    height: 100%;
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

const Update = ({cookies, history}) => {
    const [loading, setLoading] = useState(true);
    const [compareChartInfo, setCompareChartInfo] = useState({});
    const [optionCounts, setOptionCounts] = useState({});
    const [compareChartData, setCompareChartData] = useState({});
    const limitDate = useRef(0);
    const extendDate = useRef(0);
    const [data, setData] = useState([]);
    const [kinokoCount, setKinokoCount] = useState(0);
    const [modalInfo, setModalInfo] = useState({
        opacity: 0,
        customId: null,
        titleText: '',
        modalTextfirst: '',
    });

    const state = useKinokoState();
    const { data:DeviceId } = state.muchinDeviceId;

    useEffect(() => {
        getRunningChartName(DeviceId.id).then(res => {
            return res[0];
        }).then(async prgInfo => {
            if(prgInfo.id === 0) {
                return false;
            }
            console.log('asklflasjfkljasfl: ', prgInfo);

            await setCompareChartInfo({
                id: prgInfo.id,
                prg_name: prgInfo.prg_name
            })

            getKinoko(prgInfo.id).then(res => {
                setKinokoCount(res.length);
            })
            getRunningChartInfo(prgInfo.id, 'custom').then(async res => {
                console.log(res);
                extendDate.current = res.humidity.length + 1;
                limitDate.current = res.humidity.length;
                await setOptionCounts({
                    water: res.water,
                    sunshine: res.sunshine
                });
                setData(chartData => chartData.concat({
                    Date: extendDate.current + '일차',
                    Temperature: 20,
                    Humidity: 80
                }));

                let date = [];
                let temp = [];
                let humi = [];
                let grow = [];
                await res.humidity.map((ch,i) => {
                    date.push((i + 1) + '일차');
                    temp.push(res.temperature[i].setting_value);
                    humi.push(ch.setting_value);
                    if(res.growthRate.length !== 0) {
                        grow.push(res.growthRate[i].gr_value);
                    }
                });
                await setCompareChartData(setChartjsDataset(date, temp, humi, grow));
                return true;
            }).then(res => {
                if(!res)
                    setLoading(true);
                else
                    setLoading(false);
            })
        })
    },[]);

    // 1일 추가
    const Add = () => {
        extendDate.current += 1;
        let addData = {
            Temperature: 20,
            Humidity: 80,
            Date: extendDate.current + "일차"
        };

        setData(chartData => chartData.concat(addData));
        
        console.dir(data);
    };

    // 1일 빼기
    const Remove = () => { 
        setData(
            data.filter(ch => ch.Date !== extendDate.current + "일차")
        );
        extendDate.current > limitDate.current ? extendDate.current -= 1 : extendDate.current = limitDate.current; // 지정된 일차에 맞춰서
        console.dir(data);
    };

    const [count, setCount] = useState({
        sunCount: 0,
        waterCount: 3
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
                count.waterCount > 3
                    ? setCount({...count, waterCount: count.waterCount - 1})
                    : setCount({...count, waterCount: 3});
                break;
            default :
                break;
        };    
    };

    function onSubmit() {
        // http://54.210.105.132/api/farm/period/extend
        try{
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

            console.log(compareChartInfo.id);
            console.log(temp, humi);
            console.log(period);
            console.log(token);
            console.log(count);

            axios.put(`${URL}/api/farm/period/extend`, {
                id: compareChartInfo.id,
                token: token,
                period: period,
                temps: temp,
                humis: humi,
                water: count.waterCount,
                sunshine: count.sunCount
            }).then(res => {
                console.log(res);
                setModalInfo({
                    opacity: 1,
                    customId: compareChartInfo.id,
                    titleText: '프로그램을 성공적으로 연장했습니다.',
                    modalTextfirst: '',
                });
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

    function onClose () {
        setModalInfo({
            opacity: 0,
            customId: null,
            titleText: '',
            modalTextfirst: '',
        })
        history.push('/');
    }

    if(loading) return <>Loading...</>

    return (
        <>
            <CustomAddDiv>
                <UpdateGraphBox>
                    <RanEnvironmentGraph>
                        <RanCustomChart data={compareChartData}/>
                    </RanEnvironmentGraph>
                    <RanEnvironmentInfo>
                        <Description.DescriptionBox>
                            <Description.TitleBox>
                                - {compareChartInfo.prg_name} -
                            </Description.TitleBox>
                            <Description.CardFlex>
                                <Description.CardBox>
                                    <Description.CardTitle>수확한 버섯 수</Description.CardTitle>
                                    <Description.CardContent>{kinokoCount}개</Description.CardContent>
                                </Description.CardBox>
                                <Description.CardBox>
                                    <Description.CardTitle>총 재배일</Description.CardTitle>
                                    <Description.CardContent>{limitDate.current}일차</Description.CardContent>
                                </Description.CardBox>
                            </Description.CardFlex>
                            <Description.ExtraInfoBox>
                                햇빛 {optionCounts.sunshine} 회
                                물 {optionCounts.water} 회
                            </Description.ExtraInfoBox>
                        </Description.DescriptionBox> 
                    </RanEnvironmentInfo>
                </UpdateGraphBox>
            </CustomAddDiv>
            <SettingBox>
                <DrawGraph>
                    <UpdateCustomChart Data={data} titleMsg={'그래프를 업데이트 해보자!'}/>
                </DrawGraph>
                <SettingBox>
                <CheckBox>
                    <CheckMenu>
                        <WarningText>온도는 35도 이하로 제한 됩니다.</WarningText>
                        {data.map(ch => {
                            if(ch.Temperature > 27)
                                return <LogBox>{ch.Date} 온도가 27도 이상입니다!</LogBox>
                            else if(ch.Temperature < 17)
                                return <LogBox>{ch.Date} 온도가 17도 이하입니다!</LogBox>
                        })}
                    </CheckMenu>
                    <Menu2>
                        <SetDate>
                            <Button onClick={Remove}>1일 제거</Button>
                            <Button onClick={Add}>1일 추가</Button>
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
            </SettingBox>
            <Modal onClose={onClose} opacity={modalInfo.opacity} customId={modalInfo.customId} width={400} height={200}>
                <ModalTitleBox>
                    {modalInfo.titleText}
                </ModalTitleBox>
            </Modal>
        </>
    );
};

export default Update;

// modal 띄운 뒤에 이동시킬 것!