import React, {useLayoutEffect, useRef, useState} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_bullets from '@amcharts/amcharts4/plugins/bullets';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import axios from 'axios';

const ProgressChart = ({value}) => {
    console.log(window.location.pathname);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef();
    // 진행중인 프로그램 데이터 받아오기
    async function getData () {
        let obj = {
            prg_name: '',
            chartData: []
        };

        await axios.get('http://54.210.105.132/api/myfarm/data', {
            params: {
                id: 9 // 기기 id
            }
        }).then(response => {
            obj.prg_name = response.data[0].prg_name;
        });
        await axios.get('http://54.210.105.132/api/farm/data', {
            params: {
                id: 9, // 기기 id
                type: 'custom'
            }
        }).then(response => {
            console.log(response);
            let count = 0;
            response.data.temperature.map((da,index) => {
                // date 제한
                let a = new Date(da.setting_date).getDate();
                    if(new Date(da.setting_date).getHours() === 0 && a < 11) {
                        obj.chartData.push({
                            Date: new Date(da.setting_date),
                            Temp: da.setting_value,
                            Humi: response.data.humidity[index].setting_value,
                            Grow: response.data.growthRate[count].gr_value
                        });
                        count++;
                    }
                    else {
                        obj.chartData.push({
                            Date: new Date(da.setting_date),
                            Temp: da.setting_value,
                            Humi: response.data.humidity[index].setting_value,
                        });
                    }
                })
            })
        

        console.dir(obj);

        return obj;
    }
    
    useLayoutEffect(() => {
        let chart = am4core.create('chartdiv', am4charts.XYChart);
        getData().then(data => {
            
            am4core.useTheme(am4themes_animated);
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor = new am4charts.XYCursor();

            let title = chart.titles.create();
            title.text = data.prg_name;
            title.fontSize = 20;
            title.tooltipText = "남은 일자는 회색입니다~";
    
            // chart data 삽입
            chart.data = data.chartData;
    
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
            tempSeries.tooltipText = '{dateX.formatDate("MM-dd hh:mm")} : {valueY}도';
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
            humiSeries.tooltipText = "{dateX.formatDate('MM-dd hh:mm')} : {valueY}%";
    
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

            // Ref
            chartRef.current = chart;
    
            console.log(chartRef);
    
            
            return () => chart.dispose();
        });
        setTimeout(() => setLoading(false), 2000);
    }, [loading]);

    return (
        <div style={{width: '100%', height: '100%'}}>
        <>
        {loading 
        ? <>Now Loading...</>
        : <div ref={chartRef} id='chartdiv' style={{width: '100%', height: '100%'}}> </div>
        }
        </>
        </div>
    );
}

export default ProgressChart;