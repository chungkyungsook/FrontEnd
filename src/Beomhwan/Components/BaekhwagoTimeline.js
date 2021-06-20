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
        timeline.levelCount = 5;
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
                "stage": "1단계 : 갓 길이 1cm 이하",
                "value": "1단계",
                "state": "갓 길이 1cm 이하"
            }, {
                "stage": "2단계 : 갓 길이 2cm ~ 4cm",
                "value": "1단계",
                "state": "갓 길이 1cm ~ 2cm"
            }, {
                "stage": "3단계 : 갓 길이 2cm ~ 4cm",
                "value": "1단계",
                "state": "갓 길이 2cm ~ 4cm"
            }, {
                "stage": "4단계 : 갓 길이 4cm ~ 5cm",
                "value": "1단계",
                "state": "갓 길이 4cm ~ 5cm"
            }, {
                "stage": "5단계 : 갓 길이 5cm 초과",
                "value": "",
                "state": "백화고 수확이 가능합니다!"
            }
        ];

        let categoryAxis = timeline.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'stage';
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.polyspline.tensionX = 0.8;
        categoryAxis.renderer.minGridDistance = 30;
        
        let valueAxis = timeline.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.radius = 100;
        valueAxis.renderer.innerRadius = 0;
        valueAxis.renderer.grid.template.disabled = true;

        timeLineRef.current = timeline;
        return () => timeline.dispose();
    }, []);

    return <Container id="pyogoTimeline" ref={timeLineRef}></Container>
}

export default BaekhwagoTimeline;