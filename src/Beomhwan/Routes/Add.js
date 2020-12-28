import React, {useLayoutEffect, useState, useEffect} from 'react';
import styled from 'styled-components';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// 차트 데이터
const DataEx = [
	{
		"Temperature" : 20,
		"Humidity" : 80,
		"Date" : "1일차"
	},
	{
		"Temperature" : 20,
		"Humidity" : 80,
		"Date" : "2일차"
	},
	{
		"Temperature" : 20,
		"Humidity" : 80,
		"Date" : "3일차"
	},
	{
		"Temperature" : 20,
		"Humidity" : 80,
		"Date" : "4일차"
	},
	{
		"Temperature" : 20,
		"Humidity" : 80,
		"Date" : "5일차"
	}
];

// 커스텀 차트
const CustomChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(()=>{
        setChartData(DataEx);
        console.log('hello');
    },[]);

    useLayoutEffect(()=>{
        // chart 인스턴스 생성
        am4core.useTheme(am4themes_animated);
        const chart = am4core.create("CustomChartObj", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;

        // chart 데이터 삽입
        chart.data = DataEx; 
        console.log('hi');

        chart.padding(40, 40, 0, 0);
        chart.maskBullets = false;

        // X축 생성
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.title.text = "일차";
        categoryAxis.dataFields.category = "Date";
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.minGridDistance = 50;

        // Y축 생성
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.strictMinMax = true;
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.renderer.minWidth = 60;
        
        // 온도 시리즈 생성
        const TempSeries = chart.series.push(new am4charts.ColumnSeries());
        TempSeries.dataFields.valueY = "Temperature";
        TempSeries.dataFields.categoryX = "Date";
        TempSeries.tooltip.pointerOrientation = "vertical";
        TempSeries.tooltip.dy = -8;
        TempSeries.sequencedInterpolation = 1500;
        TempSeries.defaultState.interpolationDuration = 1500;
        TempSeries.columns.template.fill = am4core.color('red');

        // 습도 시리즈 생성
        const HumiSeries = chart.series.push(new am4charts.ColumnSeries());
        HumiSeries.dataFields.valueY = "Humidity";
        HumiSeries.dataFields.categoryX = "Date";
        HumiSeries.tooltip.pointerOrientation = "vertical";
        HumiSeries.tooltip.dy = -8;
        HumiSeries.sequencedInterpolation = 1500;
        HumiSeries.defaultState.interpolationDuration = 1500;

        // 온도 불릿 생성
        const TempLabelBullet = TempSeries.bullets.push(new am4charts.LabelBullet());
        TempLabelBullet.strokeOpacity = 0;
        TempLabelBullet.stroke = am4core.color("#dadada");
        TempLabelBullet.dy = -20;

        const TempBullet = TempSeries.bullets.create();
        //TempBullet.stroke = am4core.color("#ffffff");
        TempBullet.strokeWidth = 3;
        TempBullet.cursorOverStyle = am4core.MouseCursorStyle.verticalResize;
        TempBullet.draggable = true;

        // 습도 불릿 생성
        const HumiLabelBullet = HumiSeries.bullets.push(new am4charts.LabelBullet());
        HumiLabelBullet.strokeOpacity = 0;
        HumiLabelBullet.stroke = am4core.color("#dadada");
        HumiLabelBullet.dy = -20;

        const HumiBullet = HumiSeries.bullets.create();
        HumiBullet.stroke = am4core.color("#ffffff");
        HumiBullet.strokeWidth = 3;
        HumiBullet.cursorOverStyle = am4core.MouseCursorStyle.verticalResize;
        HumiBullet.draggable = true;

        // 온, 습도 드래그 이벤트
        TempBullet.events.on("drag", event => {
            handleDrag(event, valueAxis, chart, "Temperature");
        });

        HumiBullet.events.on("drag", event => {
            handleDrag(event, valueAxis, chart, "Humidity");
        });

        TempBullet.events.on("dragstop", event => {
            handleDrag(event, valueAxis, chart, "Temperature");
            const dataItem = event.target.dataItem;
            dataItem.column.isHover = false;
            event.target.isHover = false;
        });

        HumiBullet.events.on("dragstop", event => {
            handleDrag(event, valueAxis, chart, "Humidity");
            const dataItem = event.target.dataItem;
            dataItem.column.isHover = false;
            event.target.isHover = false;
        });

        // 온, 습도 템플릿 설정
        const TempColumnTemplate = TempSeries.columns.template;
        TempColumnTemplate.column.cornerRadiusTopLeft = 8;
        TempColumnTemplate.column.cornerRadiusTopRight = 8;
        TempColumnTemplate.tooltipText = "{Date} : {Temperature}도";
        TempColumnTemplate.tooltipY = 0;

        const HumiColumnTemplate = HumiSeries.columns.template;
        HumiColumnTemplate.column.cornerRadiusTopLeft = 8;
        HumiColumnTemplate.column.cornerRadiusTopRight = 8;
        HumiColumnTemplate.tooltipText = "{Date} : {Humidity}%";
        HumiColumnTemplate.tooltipY = 0;

        const TempColumnHoverState = TempColumnTemplate.column.states.create("hover");
        TempColumnHoverState.properties.fillOpacity = 1;
        TempColumnHoverState.properties.cornerRadiusTopLeft = 35;
        TempColumnHoverState.properties.cornerRadiusTopRight = 35;

        const HumiColumnHoverState = HumiColumnTemplate.column.states.create("hover");
        HumiColumnHoverState.properties.fillOpacity = 1;
        HumiColumnHoverState.properties.cornerRadiusTopLeft = 35;
        HumiColumnHoverState.properties.cornerRadiusTopRight = 35;

        // 온도 차트 컨트롤
        TempColumnTemplate.events.on("over", event => {
            over(event, TempBullet);
        });

        TempColumnTemplate.events.on("out", event => {
            out(event, TempBullet);
        });

        TempColumnTemplate.events.on("down", event => {
            down(event, TempBullet);
        });

        TempColumnTemplate.events.on("positionchanged", event => {
            positionchanged(event, TempBullet, chart);
        });
        
        // 습도 차트 컨트롤
        HumiColumnTemplate.events.on("over", event => {
            over(event, HumiBullet);
        });

        HumiColumnTemplate.events.on("out", event => {
            out(event, HumiBullet);
        });

        HumiColumnTemplate.events.on("down", event => {
            down(event, HumiBullet);
        });

        HumiColumnTemplate.events.on("positionchanged", event => {
            positionchanged(event, HumiBullet, chart);
        });

        return ()=>chart.dispose();
    },[]);

    const handleDrag = (eventArg, valueAxisArg, chartArg, dataArg) => {
        const dataItem = eventArg.target.dataItem;
        const value = valueAxisArg.yToValue(eventArg.target.pixelY);
        if(dataArg === "Temperature") 
            chartArg.data[dataItem.index].Temperature = Math.floor(value);
        if(dataArg === "Humidity") 
            chartArg.data[dataItem.index].Humidity = Math.floor(value);

        dataItem.valueY = value;
        dataItem.column.isHover = true;
        dataItem.column.hideTooltip(0);
        eventArg.target.isHover = true;
        setChartData(arr => [...arr]);
    };

    const over = (eventArg, bulletArg) => {
        const dataItem = eventArg.target.dataItem;
        const ItemBullet = dataItem.bullets.getKey(bulletArg.uid);
        ItemBullet.isHover = true;
    };

    const out = (eventArg, bulletArg) => {
        const dataItem = eventArg.target.dataItem;
        const ItemBullet = dataItem.bullets.getKey(bulletArg.uid);
        ItemBullet.isHover = false;
    };

    const down = (eventArg, bulletArg) => {
        const dataItem = eventArg.target.dataItem;
        const ItemBullet = dataItem.bullets.getKey(bulletArg.uid);
        ItemBullet.dragStart(eventArg.pointer);
        console.log(eventArg.pointer.point.x, eventArg.pointer.point.y);
    };
    
    const positionchanged = (eventArg, bulletArg, chartArg) => {
        const dataItem = eventArg.target.dataItem;
        const ItemBullet = dataItem.bullets.getKey(bulletArg.uid);

        const column = dataItem.column;
        ItemBullet.minX = column.pixelX + column.pixelWidth / 2;
        ItemBullet.maxX = ItemBullet.minX;
        ItemBullet.minY = 0;
        ItemBullet.maxY = chartArg.seriesContainer.pixelHeight;
    };

    return (
        <>
        <DrawGraphBox id="CustomChartObj"></DrawGraphBox>
        {chartData.map(current => 
        <ul>
            <li>{current.Date}</li>
            <li>{current.Humidity}%</li>
            <li>{current.Temperature}도</li>
        </ul>
        )}
        </>
    );
}


// 전체 박스
const CustomAddDiv = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
`;

// -------------------커스텀에서 선택한 환경-------------------
const SelectedCustom = styled.div`
    padding: 10px;
    flex: 1;
    height: 45vh;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    display: flex;
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
`;

// 그래프 설정 박스
const DrawGraphBox = styled.div`
    padding: 10px;
    flex: 1.5;
    height: 45vh;
`;
//-----------------------------------------------------------

// -------------------추가 설정 및 등록 박스-------------------
const SettingBoxStyled = () => {
    // 전체 div
    const SettingBox = styled.div`
        flex: 1;
        height: 45vh;
        display: flex;
        flex-direction: column;
    `;

    // 온, 습도 체크, 날짜, 물주기, 햇빛, 이름 세팅을 감싸는 div
    const CheckBox = styled.div`
        flex: 3;
        display: flex;
        flex-direction: row;
    `;

    // 온, 습도 체크 div
    const CheckMenu = styled.div`
        flex: 1;
        border: 1px solid gray;
        padding: 10px;
    `;

    // 날짜, 물주기, 햇빛 세팅 div
    const Menu2 = styled.div`
        flex: 2;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
    `;

    // 날짜 세팅 div
    const SetDate = styled.div`
        flex: 1;
        border: 1px solid gray;
        padding: 10px;
    `;

    // 물주기, 햇빛 세팅 div
    const SetWaterSun = styled.div`
        flex: 2;
        border: 1px solid gray;
        padding: 10px;
    `;

    // 커스텀 환경 이름 세팅 div
    const SettingName = styled.div`
        flex: 1;
        border: 1px solid gray;
        padding: 10px;
    `;
    return (
        <SettingBox>
            <CheckBox>
                <CheckMenu>온, 습도 체크박스 표시</CheckMenu>
                <Menu2>
                    <SetDate>날짜 지정</SetDate>
                    <SetWaterSun>물주기, 햇빛 횟수 지정</SetWaterSun>
                </Menu2>
            </CheckBox>
            <SettingName>커스텀 환경 이름 지정 및 추가 버튼 표시</SettingName>
        </SettingBox>
    );
}
// ---------------------------------------------------------

const Add = () => {
    return (
        <>
            <CustomAddDiv>
                <SelectedCustom>
                    <NoGraphSelected>
                            현재 커스텀에서 선택된 환경이 없습니다.
                    </NoGraphSelected>
                </SelectedCustom>
            </CustomAddDiv>
            <CustomAddDiv>
                <CustomChart/>
                <SettingBoxStyled/>
            </CustomAddDiv>
        </>
    );
};

export {Add, SettingBoxStyled};