import React, {useLayoutEffect, useState, useEffect} from 'react';
import axios from 'axios';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {withCookies} from 'react-cookie';
import {URL} from '../Util';

const LogoutChartComponent = ({date, value}) => {
    const [loading, setLoading] = useState(false);
    console.log(value);
    
    useLayoutEffect(() => {
        setLoading(true);

        let chart = am4core.create('logoutChart', am4charts.XYChart);
        am4core.useTheme(am4themes_animated);
        chart.scrollbarX = new am4core.Scrollbar();
        chart.cursor = new am4charts.XYCursor();

        let title = chart.titles.create();
        title.text = 'Now Loading...';
        title.fontSize = 20;
        title.tooltipText = "최근 로그아웃 시간 ~ 로그인 1시간 전까지 표시됩니다.";

        chart.legend = new am4charts.Legend();

        // data 삽입 => prg.prg_id도 추가할 것!
        chart.dataSource.url = `${URL}/api/farm/logout/list?prgId=${value.prgInfo.prg_id}&date=${date}`;
        chart.dataSource.parser = new am4core.JSONParser();
        chart.dataSource.parser.options.emptyAs = 0;
        chart.dataSource.events.on("parseended", function(ev) {
            let a = [];
            let data = ev.target.data;
            console.log('data : ', data);
            data.temperature.map((da,i) => {
                a.push({
                    temp: da.value,
                    humi: data.humidity[i].value,
                    date: new Date(da.date)
                })
            })
            
            ev.target.data = a;

            if(value.prgInfo.prg_id === 0) {
                chart.openModal('적용된 환경 프로그램이 없습니다.');
            } else if(a.length === 0 && value.prgInfo.prg_id > 0) {
                chart.openModal('로그아웃 시간이 1시간 이내 입니다.');
            }
            title.text = '로그아웃 기간 동안의 재배기 온도, 습도 변화';
        })

        // axis 생성
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.dataFields.date = 'date';

        let tempAxis = chart.yAxes.push(new am4charts.ValueAxis());
        tempAxis.dataFields.data = 'temp';
        tempAxis.title.text = "온도 / 습도";

        let humiAxis = chart.yAxes.push(new am4charts.ValueAxis());
        humiAxis.dataFields.data = 'humi';

        // series 생성
        let tempSeries = chart.series.push(new am4charts.LineSeries());
        tempSeries.name = '온도';
        tempSeries.dataFields.valueY = 'temp';
        tempSeries.dataFields.dateX = 'date';
        tempSeries.stroke = am4core.color('rgba(255,0,0,0.5)');
        tempSeries.strokeWidth = 3;
        tempSeries.tensionX = 0.8;
        tempSeries.tooltipText = '{dateX.formatDate("MM-dd HH:mm")} : {valueY}도';

        let humiSeries = chart.series.push(new am4charts.LineSeries());
        humiSeries.name = '습도';
        humiSeries.dataFields.valueY = 'humi';
        humiSeries.dataFields.dateX = 'date';
        humiSeries.stroke = am4core.color('rgba(0,0,255,0.5)');
        humiSeries.strokeWidth = 3;
        humiSeries.tensionX = 0.8;
        humiSeries.fill = am4core.color('rgba(0,0,255,1)');
        humiSeries.tooltipText = "{dateX.formatDate('MM-dd HH:mm')} : {valueY}%";

        // bullet 생성
        // let tempBullet = tempSeries.bullets.push(new am4charts.Bullet());
        // let square = tempBullet.createChild(am4core.Rectangle);
        // square.width = 10;
        // square.height = 10;
        // square.fill = am4core.color('rgba(255,0,0,0.5)');

        setLoading(false);
        return () => {console.log('hi')};
    }, []);

    if(loading) {
        return <>Chart Loading...</>
    }

    return (
        <div id="logoutChart" style={{width: '100%', height: '100%'}} />
    );
}


const LogoutChart = ({cookies, value}) => {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState('');
    const token = cookies.get('token');
    const userId = cookies.get('userId');

    useEffect(() => {
        setLoading(true);
        const getDate = async () => {
            await axios.get(`${URL}/api/logout/date`, {
                params: {
                    token: token,
                    id: userId
                }
            }).then(response => {
                console.log(response);
                setDate(response.data);
            });
            setLoading(false);
        }

        getDate();
    },[]);

    // loading 중일 때
    if(loading) {
        return <>Now Loading...</>
    }

    // date 없을 시 null 반환
    if(!date) {
        return null;
    }

    return (
        <LogoutChartComponent value={value} date={date}/>
    );
}

export default withCookies(LogoutChart);