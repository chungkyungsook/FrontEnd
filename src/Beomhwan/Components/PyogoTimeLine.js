import {useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4timeline from '@amcharts/amcharts4/plugins/timeline';

const Container = styled.div`
    width: 100%;
`;

const PyogoTimeLine = () => {
    const timeLineRef = useRef();

    useLayoutEffect(() => {
        am4core.useTheme(am4themes_animated);

        // setting timeline initial's state
        const timeline = am4core.create('pyogoTimeline', am4timeline.SerpentineChart);
        timeline.curveContainer.padding(10, 10, 10, 10);
        timeline.levelCount = 4;
        timeline.yAxisRadius = am4core.percent(25);
        timeline.yAxisInnerRadius = am4core.percent(-25);
        timeline.maskBullets = false;

        let colorSet = new am4core.ColorSet();
        colorSet.saturation = 0.5;

        timeline.data = [
            {
                "category": "timeline",
                "start": "1일차",
                "end": "5일차",
                "color": colorSet.getIndex(0),
                "task": "재배 기간"
            },
            {
                "category": "timeline",
                "start": "6일차",
                "end": "6일차",
                "color": colorSet.getIndex(1),
                "task": "예상 수확일"
            },
        ];

        timeline.dateFormatter.dateFormat = 'yyyy-MM-dd';
        timeline.dateFormatter.ainputDateFormat = 'yyyy-MM-dd';
        timeline.fontSize = 11;

        let categoryAxis = timeline.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.labels.template.paddingRight = 25;
        categoryAxis.renderer.minGridDistance = 10;
        categoryAxis.renderer.innerRadius = -60;
        categoryAxis.renderer.radius = 60;

        timeLineRef.current = timeline;
        return () => timeLineRef.current.dispose();
    }, []);

    return <Container id="pyogoTimeline" ref={timeLineRef}></Container>
}

export default PyogoTimeLine;