import React, {useLayoutEffect, useRef, useState, useEffect} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_bullets from '@amcharts/amcharts4/plugins/bullets';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import axios from 'axios';
import styled from 'styled-components';
import {withCookies} from 'react-cookie';

const ProgressChart = ({cookies}) => {
    console.log(cookies);
    console.log(window.location.pathname);
    const [loading, setLoading] = useState(true);
    const [axiosData, setAxiosData] = useState({
        prg_name: '',
        chartData: []
    });
    const chartRef = useRef(null);
    // 진행중인 프로그램 데이터 받아오기
    async function getData () {
        let obj = {
            prg_id: 0,
            prg_name: '',
            chartData: []
        };

        await axios.get('http://54.210.105.132/api/myfarm/data', {
            params: {
                id: 1 // 기기 id로 바꿔주고 나중에 시스템 갖춰졌을 때 기기 id setting
            }
        }).then(response => {
            obj.prg_name = response.data[0].prg_name;
            obj.prg_id = response.data[0].id
        });

        await axios.get('http://54.210.105.132/api/myfarm/data/hour', {
            params: {
                prgId: obj.prg_id, // 프로그램 id
            }
        }).then(async response => {
            console.log('progressChart : ', response);
            let count = 0;
            response.data.temperature.map((da,index) => {
                // date 제한
                let a = new Date(da.date);
                if(a < new Date()) {
                    if(new Date(da.date).getHours() === 0) {
                        obj.chartData.push({
                            Date: new Date(da.date),
                            Temp: da.value,
                            Humi: response.data.humidity[index].value,
                            Grow: response.data.growthRate[count].gr_value
                        });
                        count++;
                    }
                    else {
                        obj.chartData.push({
                            Date: new Date(da.date),
                            Temp: da.value,
                            Humi: response.data.humidity[index].value,
                        });
                    }
                }
            })
            await axios.get('http://54.210.105.132/api/farm/data', {
                params: {
                    id: obj.prg_id,
                    type: 'custom',
                }
            }).then(res => {
                console.log(res.data);
                res.data.humidity.map((ch,i) => {
                    if(new Date(ch.setting_date) > new Date()) {
                        obj.chartData.push({
                            Date: new Date(ch.setting_date),
                            Temp: res.data.temperature[i].setting_value,
                            Humi: ch.setting_value
                        })
                    }
                })
            })
        })
        
        console.dir(obj);
        return obj;
    }

    useEffect(() => {
        chartRef.current = am4core.create('progressChart', am4charts.XYChart);
        chartRef.current.dataSource.reloadFrequency = 4000;
        getData().then(value => {
            setAxiosData({
                prg_name: value.prg_name,
                chartData: value.chartData
            });

            am4core.useTheme(am4themes_animated);
            chartRef.current.scrollbarX = new am4core.Scrollbar();
            chartRef.current.cursor = new am4charts.XYCursor();
            chartRef.current.dataSource.updateCurrentData = true;

            let title = chartRef.current.titles.create();
            title.text = axiosData.prg_name;
            title.fontSize = 20;
            title.tooltipText = "당일데이터는 1시간 단위로 측정 중입니다.";
            
            // chart data 삽입
            chartRef.current.data = axiosData.chartData;

            chartRef.current.legend = new am4charts.Legend();

            // X축 생성
            let categoryAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
            categoryAxis.dataFields.category = 'Date';
            categoryAxis.title.text = "일자";
            categoryAxis.renderer.axisFills.template.disabled = false;
            categoryAxis.renderer.axisFills.template.fill = am4core.color('rgba(0,0,0,0.4)');
            categoryAxis.renderer.axisFills.template.fillOpacity = 0.2;

            // Y축 생성
            let tempAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
            tempAxis.dataFields.data = 'Temp';
            tempAxis.title.text = "온도 / 습도";

            let humiAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
            humiAxis.dataFields.data = 'Humi';

            let growAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
            growAxis.dataFields.data = 'Grow';

            // 시리즈 생성
            let tempSeries = chartRef.current.series.push(new am4charts.LineSeries());
            tempSeries.name = '온도';
            tempSeries.dataFields.valueY = 'Temp';
            tempSeries.dataFields.dateX = 'Date';
            tempSeries.stroke = am4core.color('rgba(255,0,0,0.5)');
            tempSeries.strokeWidth = 3;
            tempSeries.tensionX = 0.8;
            tempSeries.tooltipText = '{dateX.formatDate("MM-dd HH:mm")} : {valueY}도';
            // tempSeries.fillOpacity = 1;
            tempSeries.fill = am4core.color('rgba(255,0,0,1)');
            
            let humiSeries = chartRef.current.series.push(new am4charts.LineSeries());
            humiSeries.name = '습도';
            humiSeries.dataFields.valueY = 'Humi';
            humiSeries.dataFields.dateX = 'Date';
            humiSeries.stroke = am4core.color('rgba(0,0,255,0.5)');
            humiSeries.strokeWidth = 3;
            humiSeries.tensionX = 0.8;
            // humiSeries.fillOpacity = 1;
            humiSeries.fill = am4core.color('rgba(0,0,255,1)');
            humiSeries.tooltipText = "{dateX.formatDate('MM-dd HH:mm')} : {valueY}%";

            let growSeries = chartRef.current.series.push(new am4charts.LineSeries());
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

            console.log(chartRef);
        });
        setTimeout(() => {setLoading(false)}, 2000);
    }, [loading]);

    return (
        <ProgressBox ref={chartRef} id="progressChart">
        </ProgressBox>
    );
}

const ProgressBox = styled.div`
    width: 100%;
    height: 100%;
`;

export default withCookies(ProgressChart);