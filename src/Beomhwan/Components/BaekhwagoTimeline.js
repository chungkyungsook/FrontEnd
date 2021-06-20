import {useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4timeline from '@amcharts/amcharts4/plugins/timeline';
import * as am4bullets from '@amcharts/amcharts4/plugins/bullets';

const Container = styled.div`
    width: 100%;
    height: 600px;
`;

const BaekhwagoTimeline = () => {
    const timeLineRef = useRef();

    useLayoutEffect(() => {
        am4core.useTheme(am4themes_animated);

        // setting timeline initial's state
        const timeline = am4core.create('pyogoTimeline', am4timeline.SerpentineChart);
        timeline.curveContainer.padding(50, 20, 50, 20);
        timeline.levelCount = 4;
        timeline.yAxisRadius = am4core.percent(25);
        timeline.yAxisInnerRadius = am4core.percent(-25);
        timeline.maskBullets = false;
        let title = timeline.titles.create();
        title.text = '백화고 환경 프로그램 로드맵';
        title.fontSize = 20;

        let colorSet = new am4core.ColorSet();
        colorSet.saturation = 0.5;

        timeline.data = [
            {
                "stage": "1단계",
                "value": 1
            }, 
            {
                "stage": "2단계",
                "value": 2
            },
            {
                "stage": "3단계",
                "value": 3
            }, 
            {
                "stage": "4단계",
                "value": 4
            },
            {
                "stage": "5단계",
                "value": 5
            },
        ];

        // let stageAxis = timeline.yAxes.push(new am4charts.CategoryAxis());
        // stageAxis.dataFields.category = "stage";
        // stageAxis.renderer.grid.template.disabled = true;
        // stageAxis.renderer.labels.template.paddingRight = 25;
        // stageAxis.renderer.minGridDistance = 10;
        // stageAxis.renderer.innerRadius = -60;
        // stageAxis.renderer.radius = 60;

        // let valueAxis = timeline.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.renderer.radius = 100;
        // valueAxis.renderer.innerRadius = 0;
        // valueAxis.renderer.grid.template.disabled = true;

        // let series = timeline.series.push(new am4timeline.SerpentineChart());
        // series.dataFields.valueY = 'value';
        // series.dataFields.categoryX = 'state';
        // series.columns.template.fillOpacity = 0.5;
        // series.columns.template.strokeWidth = 2;

        timeLineRef.current = timeline;
        return () => timeline.dispose();
    }, []);

    return <Container id="pyogoTimeline" ref={timeLineRef}></Container>
}

export default BaekhwagoTimeline;