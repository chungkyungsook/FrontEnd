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

const PyogoTimeLine = () => {
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
        title.text = '표고버섯 환경 프로그램 로드맵';
        title.fontSize = 20;

        let colorSet = new am4core.ColorSet();
        colorSet.saturation = 0.5;

        timeline.data = [
            {
                "category": "재배 기간",
                "start": new Date(),
                "end": new Date().setDate(new Date().getDate() + 15),
                "color": colorSet.getIndex(0),
                "task": "버섯 재배"
            }, 
            {
                "category": "예상 수확일",
                "start": new Date().setDate(new Date().getDate() + 5),
                "end": new Date().setDate(new Date().getDate() + 6),
                "color": colorSet.getIndex(5),
                "task": "예상 수확일"
            }, 
            {
                "category": "예상 수확일",
                "start": new Date().setDate(new Date().getDate() + 10),
                "end": new Date().setDate(new Date().getDate() + 11),
                "color": colorSet.getIndex(10),
                "task": "예상 수확일"
            }, 
            {
                "category": "예상 수확일",
                "start": new Date().setDate(new Date().getDate() + 14),
                "end": new Date().setDate(new Date().getDate() + 15),
                "color": colorSet.getIndex(15),
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

        let dateAxis = timeline.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 70;
        dateAxis.baseInterval = { count: 1, timeUnit: "day" };
        dateAxis.renderer.tooltipLocation = 0;
        dateAxis.startLocation = -0.5;
        dateAxis.renderer.line.strokeDasharray = "1,4";
        dateAxis.renderer.line.strokeOpacity = 0.6;
        dateAxis.tooltip.background.fillOpacity = 0.2;
        dateAxis.tooltip.background.cornerRadius = 5;
        dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        dateAxis.tooltip.label.paddingTop = 7;

        let labelTemplate = dateAxis.renderer.labels.template;
        labelTemplate.verticalCenter = 'middle';
        labelTemplate.fillOpacity = 0.7;
        labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor('background');
        labelTemplate.background.fillOpacity = 1;
        labelTemplate.padding(7, 7, 7, 7);

        let series = timeline.series.push(new am4timeline.CurveColumnSeries());
        series.columns.template.height = am4core.percent(20);
        series.columns.template.tooltipText = '{task}:[bold]{openDateX}[/] - [bold]{dateX}[/]';

        series.dataFields.openDateX = "start";
        series.dataFields.dateX = "end";
        series.dataFields.categoryY = "category";
        series.columns.template.propertyFields.fill = "color"; // get color from data
        series.columns.template.propertyFields.stroke = "color";
        series.columns.template.strokeOpacity = 0;

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.radius = 3;
        bullet.circle.strokeOpacity = 0;
        bullet.propertyFields.fill = "color";
        bullet.locationX = 0;

        let bullet2 = series.bullets.push(new am4charts.CircleBullet());
        bullet2.circle.radius = 3;
        bullet2.circle.strokeOpacity = 0;
        bullet2.propertyFields.fill = "color";
        bullet2.locationX = 1;

        let imageBullet1 = series.bullets.push(new am4bullets.PinBullet());
        imageBullet1.disabled = true;
        imageBullet1.propertyFields.disabled = "disabled1";
        imageBullet1.locationX = 1;
        imageBullet1.circle.radius = 10;
        imageBullet1.propertyFields.stroke = "color";
        imageBullet1.background.propertyFields.fill = "color";

        let imageBullet2 = series.bullets.push(new am4bullets.PinBullet());
        imageBullet2.disabled = true;
        imageBullet2.propertyFields.disabled = "disabled2";
        imageBullet2.locationX = 0;
        imageBullet2.circle.radius = 10;
        imageBullet2.propertyFields.stroke = "color";
        imageBullet2.background.propertyFields.fill = "color";

        let cursor = new am4timeline.CurveCursor();
        timeline.cursor = cursor;
        cursor.xAxis = dateAxis;
        cursor.yAxis = categoryAxis;
        cursor.lineY.disabled = true;
        cursor.lineX.strokeDasharray = "1,4";
        cursor.lineX.strokeOpacity = 1;

        dateAxis.renderer.tooltipLocation2 = 0;
        categoryAxis.cursorTooltipEnabled = false;

        timeLineRef.current = timeline;
        return () => timeline.dispose();
    }, []);

    return <Container id="pyogoTimeline" ref={timeLineRef}></Container>
}

export default PyogoTimeLine;