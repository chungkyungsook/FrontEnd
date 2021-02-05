import React, {useLayoutEffect, useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import ChartSlider from '../Components/ChartSlider';
import Select from '../Components/Select';
import InputPrgName from '../Components/InputprgName';
import {flexAlign} from '../../Util/css';
import axios from 'axios';


// 커스텀 차트
const CustomChart = ({Data}) => {
    const chart = useRef(null);
    const [chartData, setChartData] = useState(Data);

    useLayoutEffect(() => {
            // chart 인스턴스 생성
            am4core.useTheme(am4themes_animated);
            chart.current = am4core.create("CustomChartObj", am4charts.XYChart);
            chart.current.hiddenState.properties.opacity = 0;
            // chart 데이터 삽입
            chart.current.data = chartData; 
            console.dir(chart.current.data);

            chart.current.padding(40, 40, 0, 0);
            chart.current.maskBullets = false;

            // scrollbar 설정
            const scrollbar = new am4charts.XYChartScrollbar();
            scrollbar.startGrip.tooltipText = "확대 및 축소가 가능합니다";
            scrollbar.endGrip.tootipText = "확대 및 축소가 가능합니다";
            scrollbar.thumb.tooltipText = "좌우로 이동 가능합니다";
            scrollbar.showSystemTooltip = false;
            console.dir(scrollbar);
            chart.current.scrollbarX = scrollbar;

            // X축 생성
            const categoryAxis = chart.current.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.title.text = "일차";
            categoryAxis.dataFields.category = "Date";
            categoryAxis.renderer.grid.template.disabled = true;
            categoryAxis.renderer.minGridDistance = 50;

            // Y축 생성
            const valueAxis = chart.current.yAxes.push(new am4charts.ValueAxis());
            valueAxis.strictMinMax = true;
            valueAxis.min = 0;
            valueAxis.max = 100;
            valueAxis.renderer.minWidth = 60;
            
            // 온도 시리즈 생성
            const TempSeries = chart.current.series.push(new am4charts.ColumnSeries());
            TempSeries.dataFields.valueY = "Temperature";
            TempSeries.dataFields.categoryX = "Date";
            TempSeries.tooltip.pointerOrientation = "vertical";
            TempSeries.tooltip.dy = -8;
            TempSeries.sequencedInterpolation = 1500;
            TempSeries.defaultState.interpolationDuration = 1500;
            TempSeries.columns.template.fill = am4core.color('red');

            // 습도 시리즈 생성
            const HumiSeries = chart.current.series.push(new am4charts.ColumnSeries());
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
            TempLabelBullet.label.text = "{valueY.value.formatNumber('#.')}도";
            TempLabelBullet.dy = -20;

            const TempBullet = TempSeries.bullets.create();
            TempBullet.strokeWidth = 3;
            TempBullet.cursorOverStyle = am4core.MouseCursorStyle.verticalResize;
            TempBullet.draggable = true;

            // 습도 불릿 생성
            const HumiLabelBullet = HumiSeries.bullets.push(new am4charts.LabelBullet());
            HumiLabelBullet.strokeOpacity = 0;
            HumiLabelBullet.label.text = "{valueY.value.formatNumber('#.')}%";
            HumiLabelBullet.stroke = am4core.color("#dadada");
            HumiLabelBullet.dy = -20;

            const HumiBullet = HumiSeries.bullets.create();
            HumiBullet.stroke = am4core.color("#ffffff");
            HumiBullet.strokeWidth = 3;
            HumiBullet.cursorOverStyle = am4core.MouseCursorStyle.verticalResize;
            HumiBullet.draggable = true;

            // 온, 습도 드래그 이벤트
            TempBullet.events.on("drag", event => {
                handleDrag(event, valueAxis, chart.current, "Temperature");
            });

            HumiBullet.events.on("drag", event => {
                handleDrag(event, valueAxis, chart.current, "Humidity");
            });

            TempBullet.events.on("dragstop", event => {
                handleDrag(event, valueAxis, chart.current, "Temperature");
                const dataItem = event.target.dataItem;
                dataItem.column.isHover = false;
                event.target.isHover = false;
            });

            HumiBullet.events.on("dragstop", event => {
                handleDrag(event, valueAxis, chart.current, "Humidity");
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

            TempColumnTemplate.events.on("positionchanged", event => {
                var dataItem = event.target.dataItem;
                var itemBullet = dataItem.bullets.getKey(TempBullet.uid);
                var column = dataItem.column;
                itemBullet.minX = column.pixelWidth / 2;
                itemBullet.maxX = itemBullet.minX;
                itemBullet.minY = 0;
                itemBullet.maxY = chart.current.seriesContainer.pixelHeight;
            });

            HumiColumnTemplate.events.on("positionchanged", event => {
                var dataItem = event.target.dataItem;
                var itemBullet = dataItem.bullets.getKey(HumiBullet.uid);
                var column = dataItem.column;
                itemBullet.minX = column.pixelWidth / 2;
                itemBullet.maxX = itemBullet.minX;
                itemBullet.minY = 0;
                itemBullet.maxY = chart.current.seriesContainer.pixelHeight;
            }); 

        return () => {chart.current.dispose()}
    },[]);

    useEffect(() => {
        if (chart.current) {
            chart.current.data = Data;

            console.log(Data.length);
        }
    },[Data.length]);

    const handleDrag = (eventArg, valueAxisArg, chartArg, dataArg) => {
        const dataItem = eventArg.target.dataItem;
        const value = valueAxisArg.yToValue(eventArg.target.pixelY);
        if(dataArg === "Temperature")
            chartArg.data[dataItem.index].Temperature = Math.round(value);
        if(dataArg === "Humidity")
            chartArg.data[dataItem.index].Humidity = Math.round(value);

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

    return (
        <>
        <DrawGraphBox id="CustomChartObj" ref={chart}></DrawGraphBox>
        </>
    );
};

const ButtonBox = ({Add, Remove}) => {
    return (
        <>
            <button onClick={Add}>1일 추가</button>
            <button onClick={Remove}>1일 빼기</button>
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
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
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
    ${flexAlign};
`;

// 물주기, 햇빛 세팅 div
const SetWaterSun = styled.div`
    flex: 2;
    border: 1px solid gray;
    padding: 10px;
    ${flexAlign};
`;

// 커스텀 환경 이름 세팅 div
const SettingName = styled.div`
    flex: 1;
    border: 1px solid gray;
    padding: 10px;
    ${flexAlign};
`;

// ---------------------------------------------------------


// ---------------------------------------------------------
const Add = () => {
    const [loading, setLoading] = useState(true);
    const date = useRef(2);
    const [chartData, setChartData] = useState([
        {
            Temperature: 20,
            Humidity: 80,
            Date: 1 + "일차"
        }
    ]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500); // 로딩 1.5초 세팅
    },[]);

    // 1일 추가
    const Add = () => {
        let addData = {
            Temperature: 20,
            Humidity: 80,
            Date: date.current + "일차"
        };

        setChartData(chartData => chartData.concat(addData));
        date.current += 1;
        console.dir(chartData);
    };

    // 1일 빼기
    const Remove = () => {
        setChartData(
            chartData.filter(ch => ch.Date !== (date.current - 1) + "일차")
        );
        date.current > 1 ? date.current -= 1 : date.current = 1;
        console.dir(chartData);
    };

    // axios 전송
    const Save = () => {
        let temp = [];
        let humi = [];
        chartData.map(ch => {
            temp.push(ch.Temperature);
            humi.push(ch.Humidity);
        });
        console.log(temp, humi);
        console.log('date : ' + chartData.length);
        console.log(count, prgInput);

        axios.post('http://172.26.3.62/api/farm/custom', 
            {
                params: {
                    machineId: 0,
                    water: count.waterCount,
                    sunshine: count.sunCount,
                    period: chartData.length,
                    name: prgInput.prg_name,
                    temp: temp,
                    humi: humi
                }
            }
        ).then(response => {
            console.log(response);
            window.location.href = ('http://localhost:3000/setting/custom');
        }).catch(e => {console.error(e);});
    };

    const [count, setCount] = useState({
        sunCount: 0,
        waterCount: 0
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
                count.waterCount < 5 
                    ? setCount({...count, waterCount: count.waterCount + 1})
                    : setCount({...count, waterCount: 5});
                break;
            case '-' :
                count.waterCount > 0
                    ? setCount({...count, waterCount: count.waterCount - 1})
                    : setCount({...count, waterCount: 0});
                break;
            default :
                break;
        };    
    };

    const [prgInput, setPrgInput] = useState({
        prg_name: ''
    });

    const onChange = (e) => {
        setPrgInput({prg_name: e.target.value});
    };

    return (
        <>
        {loading 
        ? <>now Loading...</>
        : <>           
            <CustomAddDiv>
                <SelectedCustom>
                    <ChartSlider />
                </SelectedCustom>
            </CustomAddDiv>
            <CustomAddDiv>
                <CustomChart Data={chartData} />
                <SettingBox>
                <CheckBox>
                    <CheckMenu>온, 습도 체크박스 표시</CheckMenu>
                    <Menu2>
                        <SetDate>
                            <ButtonBox Add={Add} Remove={Remove} />
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
                    <InputPrgName onChange={onChange} />
                    <button onClick={Save}>저장</button>
                </SettingName>
                </SettingBox>
            </CustomAddDiv>
            </>}
        </>
    );  
};

export {Add, SettingBox, CheckBox, CheckMenu, Menu2, SetDate, SetWaterSun, SettingName};