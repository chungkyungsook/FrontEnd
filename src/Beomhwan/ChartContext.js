// Custom chart list context
import React, {createContext, useState, useEffect, useContext} from 'react';
import {withCookies} from 'react-cookie';
import axios from 'axios';
import {URL, Local} from './Util';

// 커스텀 차트 데이터셋 context
const CustomChartListContext = createContext();
// 커스텀 차트 id 및 정보
const CustomChartListInfoContext = createContext();
// 커스텀 차트 기기 아이디 정보
const UserMachineIdContext = createContext();
// 커스텀 업데이트 프로그램 아이디 정보
const CustomUpdatePrgIdContext = createContext();

// chartjs dataset
export const setChartjsDataset = (date, temp, humi, growth) => {
    let chartdata = {
        labels: date,
        datasets: [
            {
                label: 'Temperature',
                data: temp,
                fill: false,
                borderColor: 'rgba(255,0,0,0.3)'
            },
            {
                label: 'Humidity',
                data: humi,
                fill: false,
                borderColor: 'rgba(0,0,255,0.3)'
            },
            {
                label: 'GrowthRate',
                data: growth,
                fill: false,
                borderColor: 'gray'
            },
        ]
    };

    return chartdata;
}

const ChartContext = ({children, machineId}) => {
    const [customChartDataSet, setCustomChartDataSet] = useState([]);
    const [customChartInfo, setCustomChartInfo] = useState([]);
    const [customUpdateChartInfo, setCustomUpdateChartInfo] = useState({});
    // const machineIdValue = cookies.get('deviceNumber');
    console.log(machineId);


    // const machineIdValue = getMachineId();
    
    useEffect(() => {
        
        // get chart data
        getData()
        .then(value => {
            // api 데이터 가져왔고
            let da = value.data;
            return da;
        })
        .then(async ch => {
            // 커스텀 차트 정보에 데이터 삽입
            setCustomChartInfo(ch);
            await ch.forEach(data => {
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
                setCustomChartDataSet(
                    ch =>
                    ch.concat(setChartjsDataset(dateArr, tempArr, humiArr, growthArr))
                );
            });
        });

        getUpdateChartId(machineId).then(res => {
            setCustomUpdateChartInfo(res[0]);
            return res;
        }).then(prgInfo => {
            console.log('prgInfo : ', prgInfo)
            let prgType = 'custom';
            getUpdate(prgInfo[0].id, prgType).then(res => {
                setCustomUpdateChartInfo({...prgInfo[0], res, date: res.humidity.length})
                console.log(customUpdateChartInfo);
            });
        });
    },[]);

    // 프로그램 리스트 데이터 get
    const getData = async () => {
        let data = await axios.get(`${URL}/api/farm/custom/list`);

        console.log(data);

        return data;
    }

    // 현재 프로그램 id, 이름 get
    async function getUpdateChartId (machineId) {
        let data = await axios.get(`${URL}/api/myfarm/data`, {
            params: {
                id: 1 // machineId
            }
        }).then(res => {
            console.log(res);
            return res.data;
        }).catch(err => {
            console.log(err);
        })
        return data;
    }

    // 현재 프로그램 차트 정보 get
    async function getUpdate (prgId, prgType) {
        let data = await axios.get('http://54.210.105.132/api/farm/data', {
            params: {
                id: prgId,
                type: prgType
            }
        }).then(res => {
            return res.data;
        });
        
        return data;
    }

    return (
        <CustomChartListInfoContext.Provider value={customChartInfo}>
            <CustomChartListContext.Provider value={customChartDataSet}>
                <UserMachineIdContext.Provider value={machineId}>
                    <CustomUpdatePrgIdContext.Provider value={customUpdateChartInfo}>
                        {children}
                    </CustomUpdatePrgIdContext.Provider>
                </UserMachineIdContext.Provider>
            </CustomChartListContext.Provider>
        </CustomChartListInfoContext.Provider>
    );
};

export default withCookies(ChartContext);

export function useCustomChartList() {
    const chartjsListContext = useContext(CustomChartListContext);
    if(!chartjsListContext) 
        console.error('차트 데이터셋 없음');
    return chartjsListContext;
};

export function useCustomChartInfo() {
    const customInfoContext = useContext(CustomChartListInfoContext);
    if(customInfoContext.length === 0) 
        console.error('차트 정보 없음');
    return customInfoContext;
};

export function useMachineInfo() {
    const machineinfo = useContext(UserMachineIdContext);
    if(!machineinfo)
        console.error('기기 정보 없음!');
    return machineinfo;
};

export function useCustomUpdateInfo() {
    const CustomUpdateInfo = useContext(CustomUpdatePrgIdContext);
    console.log(CustomUpdateInfo);

    return CustomUpdateInfo;
}



    // // UserId를 통한 기기 id get
    // const getMachineId = async () => {
    //     console.log(userIdvalue);
    //     let machineIdPromise = await axios.get('http://172.26.3.62/api/myfarm/id', {
    //         params: {userId: 'SZ4S71'} // <--userIdvalue로 고쳐야 함!!!!!!!!!!!!!!!!!!!!!!!!!!
    //     }).then(response => {
    //         console.log(response);
    //         return response.data;
    //     }).catch(err => {
    //         console.error(err);
    //     });
    //     return machineIdPromise;
    // }