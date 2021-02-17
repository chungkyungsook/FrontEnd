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

// chartjs dataset
const setChartjsDataset = (date, temp, humi, growth) => {
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
    console.log(machineId);
    // const machineIdValue = cookies.get('deviceNumber');

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
                    dateArr.push(index + 1);
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
    },[]);

    // 프로그램 리스트 데이터 get
    const getData = async () => {
        let data = await axios.get(`${URL}/api/farm/custom/list`);
        console.log(data);

        return data;
    }

    return (
        <CustomChartListInfoContext.Provider value={customChartInfo}>
            <CustomChartListContext.Provider value={customChartDataSet}>
                <UserMachineIdContext.Provider value={machineId}>
                    {children}
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
    console.log(machineinfo);
    if(!machineinfo)
        console.error('기기 정보 없음!');
    return machineinfo;
};



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