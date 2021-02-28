import React, {useLayoutEffect, useRef, useState, useEffect} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_bullets from '@amcharts/amcharts4/plugins/bullets';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import axios from 'axios';
import styled from 'styled-components';
import {withCookies} from 'react-cookie';


function useGetPrgInfo () {
    const [prgInfo, setPrgInfo] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        async function getPrgInfo() {
            await axios.get('http://54.210.105.132/api/myfarm/data', {
                params: {
                    id: 1 // 기기 id로 바꿔주고 나중에 시스템 갖춰졌을 때 기기 id setting
                }
            }).then(response => {
                setPrgInfo({
                    prg_name: response.data[0].prg_name,
                    prg_id: response.data[0].id
                });
                setLoading(false);
            });
        }

        getPrgInfo();
    },[]);

    if(loading) {
        return 'loading';
    }

    return prgInfo;
}


function useGetPrgData() {
    const [prgData, setPrgData] = useState({
        prgInfo: useGetPrgInfo(),
        chartData: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        async function getPrgData(prg_id) {

            let chartData = [];
            
            await axios.get('http://54.210.105.132/api/farm/data', {
                params: {
                    id: 5,
                    type: 'custom',
                }
            }).then(res => {
                console.log(res.data);
                res.data.humidity.map((ch,i) => {
                    if(new Date(ch.setting_date) > new Date()) {
                        chartData.push({
                            Date: new Date(ch.setting_date),
                            Temp: res.data.temperature[i].setting_value,
                            Humi: ch.setting_value
                        });
                    }
                })
                setPrgData({...prgData, chartData: chartData});
                setLoading(false);
            });
        }

        getPrgData();
    },[prgData.prgInfo]);

    console.log(prgData);

    if(loading) {
        return 'Now Loading...';
    }

    return prgData;
}


const ProgressChart = ({cookies, prgInfo}) => {
    console.log(cookies);
    console.log(window.location.pathname);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(prgInfo);

    useEffect(() => {
        async function getPrgData(prg_id) {
            let chartData = [];
            await axios.get('http://54.210.105.132/api/farm/data', {
                params: {
                    id: prg_id,
                    type: 'custom',
                }
            }).then(res => {
                console.log(res.data);
                res.data.humidity.map((ch,i) => {
                    if(new Date(ch.setting_date) > new Date()) {
                        chartData.push({
                            Date: new Date(ch.setting_date),
                            Temp: res.data.temperature[i].setting_value,
                            Humi: ch.setting_value
                        });
                    }
                })
                setChartData(chartData);
                setLoading(false);
            });
        }

        getPrgData(prgInfo.prg_id);
    },[]);

    useLayoutEffect(() => {
        if(!loading) {
        // 진행 차트
        let chart = am4core.create('progressChart', am4charts.XYChart);

        am4core.useTheme(am4themes_animated);
        chart.scrollbarX = new am4core.Scrollbar();
        chart.cursor = new am4charts.XYCursor();
        chart.dataSource.updateCurrentData = true;

        let title = chart.titles.create();
        title.text = prgInfo.prg_name;
        title.fontSize = 20;
        title.tooltipText = "당일데이터는 1시간 단위로 측정 중입니다.";

        // data 부터 받아오기
        chart.dataSource.url = `http://54.210.105.132/api/myfarm/data/hour?prgId=${prgInfo.prg_id}`;
        chart.dataSource.parser = new am4core.JSONParser();
        chart.dataSource.parser.options.emptyAs = 0;
        chart.dataSource.updateCurrentData = true;

        chart.dataSource.events.on('parseended', function (ev) {
            let obj = {
                chartData: []
            }
            let count = 0;
            let data = ev.target.data;
            console.log(data);

            data.temperature.map((da, index) => {
                // 생장률 하루 한번 기록
                let a = new Date(da.date);
                if(a < new Date()) {
                    if(new Date(da.date).getHours() === 0) {
                        obj.chartData.push({
                            Date: new Date(da.date),
                            Temp: da.value,
                            Humi: data.humidity[index].value,
                            Grow: data.growthRate[count].gr_value
                        });
                        count++;
                    }
                    else {
                        obj.chartData.push({
                            Date: new Date(da.date),
                            Temp: da.value,
                            Humi: data.humidity[index].value,
                        });
                    }
                }
            })
            console.log(chartData);

            let chart = obj.chartData.concat(chartData);

            console.log(obj.chartData);

            ev.target.data = chart;

            if(prgInfo.prg_id === 0 && prgInfo.prg_name === '') {
                title.text = '현재 환경 프로그램이 실행 되고 있지 않습니다.';
                chart.tooltipText = '버섯을 재배할 준비를 마친 후 팜 환경설정에서 프로그램을 시작해주세요.'
            }
        })

        chart.legend = new am4charts.Legend();

        // X축 생성
        let categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
        categoryAxis.dataFields.category = 'Date';
        categoryAxis.title.text = "일자";
        categoryAxis.renderer.axisFills.template.disabled = false;
        categoryAxis.renderer.axisFills.template.fill = am4core.color('rgba(0,0,0,0.4)');
        categoryAxis.renderer.axisFills.template.fillOpacity = 0.2;

        // Y축 생성
        let tempAxis = chart.yAxes.push(new am4charts.ValueAxis());
        tempAxis.dataFields.data = 'Temp';
        tempAxis.title.text = "온도 / 습도";

        let humiAxis = chart.yAxes.push(new am4charts.ValueAxis());
        humiAxis.dataFields.data = 'Humi';

        let growAxis = chart.yAxes.push(new am4charts.ValueAxis());
        growAxis.dataFields.data = 'Grow';

        // 시리즈 생성
        let tempSeries = chart.series.push(new am4charts.LineSeries());
        tempSeries.name = '온도';
        tempSeries.dataFields.valueY = 'Temp';
        tempSeries.dataFields.dateX = 'Date';
        tempSeries.stroke = am4core.color('rgba(255,0,0,0.5)');
        tempSeries.strokeWidth = 3;
        tempSeries.tensionX = 0.8;
        tempSeries.tooltipText = '{dateX.formatDate("MM-dd HH:mm")} : {valueY}도';
        // tempSeries.fillOpacity = 1;
        tempSeries.fill = am4core.color('rgba(255,0,0,1)');
        
        let humiSeries = chart.series.push(new am4charts.LineSeries());
        humiSeries.name = '습도';
        humiSeries.dataFields.valueY = 'Humi';
        humiSeries.dataFields.dateX = 'Date';
        humiSeries.stroke = am4core.color('rgba(0,0,255,0.5)');
        humiSeries.strokeWidth = 3;
        humiSeries.tensionX = 0.8;
        // humiSeries.fillOpacity = 1;
        humiSeries.fill = am4core.color('rgba(0,0,255,1)');
        humiSeries.tooltipText = "{dateX.formatDate('MM-dd HH:mm')} : {valueY}%";

        let growSeries = chart.series.push(new am4charts.LineSeries());
        growSeries.name = '생장률';
        growSeries.dataFields.valueY = 'Grow';
        growSeries.dataFields.dateX = 'Date';
        growSeries.strokeWidth = 0;

        let growBullet = growSeries.bullets.push(new am4plugins_bullets.Star());
        growBullet.tooltipText = '{dateX} : {valueY}%';
        growBullet.cornerRadius = 20;
        growBullet.innerCornerRadius = 0;
        growBullet.arc = 360;
        growBullet.pointCount = 5;
        growBullet.innerRadius = am4core.percent(51);
        growBullet.radius = 15;
        growBullet.fill = am4core.color('yellow');
        growBullet.stroke = am4core.color('rgba(0,0,0,0.3)');

        console.log(categoryAxis);

        categoryAxis.fillRule = function(dataItem) {
            let date = new Date(dataItem.value);
            let dateNow = new Date();
            
            date > dateNow
                ? dataItem.axisFill.disabled = false
                : dataItem.axisFill.disabled = true;
        }

        return () => {
            chart.dispose();;
        }
    }
    }, [loading]);

    if(loading) {
        return <>Now Loading...</>
    }

    if(prgInfo.prg_id === 0) {
        return <>현재 프로그램이 실행 되고 있지 않습니다.</>
    }

    return (
        <ProgressBox id="progressChart" />
    );
}

const ProgressBox = styled.div`
    width: 100%;
    height: 100%;
`;

export default withCookies(ProgressChart);