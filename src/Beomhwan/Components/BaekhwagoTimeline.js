import {useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4timeline from '@amcharts/amcharts4/plugins/timeline';

const Container = styled.div`
    width: 100%;
    height: 600px;
`;

const BaekhwagoTimeline = () => {
    const timeLineRef = useRef();

    useLayoutEffect(() => {
        am4core.useTheme(am4themes_animated);

        // Create chart instance
        var chart = am4core.create("baekhwaTimeline", am4timeline.SpiralChart);
        chart.levelCount = 3;
        chart.inversed = true;
        chart.endAngle = -135;

        let title = chart.titles.create();
        title.text = '백화고 환경 프로그램 로드맵';
        title.fontSize = 20;

        chart.data = [
            { 
                category: "1단계", 
                openValue: 0, 
                endValue: 1,
                description: '1단계에서는 갓 길이가 1cm 이하입니다.'
            },
            { 
                category: "2단계", 
                openValue: 1, 
                endValue: 2,
                description: '2단계에서는 갓 길이가 1cm ~ 2cm 입니다.'
            },
            { 
                category: "3단계", 
                openValue: 2, 
                endValue: 3,
                description: '3단계에서는 갓 길이가 2cm ~ 4cm 입니다.'
            },
            { 
                category: "4단계", 
                openValue: 3, 
                endValue: 4,
                description: '4단계에서는 갓 길이가 4cm ~ 5cm 입니다.'
            },
            { 
                category: "5단계", 
                openValue: 4, 
                endValue: 5,
                description: '5단계에서는 갓 길이가 5cm 초과입니다.'
            },
        ];

        chart.fontSize = 10;
        chart.tooltipContainer.fontSize = 10;

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.minGridDistance = 10;
        categoryAxis.renderer.innerRadius = 0;
        categoryAxis.renderer.radius = 80;
        categoryAxis.cursorTooltipEnabled = false;


        var categoryAxisLabelTemplate = categoryAxis.renderer.labels.template;
        categoryAxisLabelTemplate.paddingLeft = 30;
        categoryAxisLabelTemplate.horizontalCenter = "left";
        categoryAxisLabelTemplate.adapter.add("rotation", function (rotation, target) {
            var position = valueAxis.valueToPosition(valueAxis.min);
            return valueAxis.renderer.positionToAngle(position) + 90;
        });

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minGridDistance = 70;
        valueAxis.paddingRight = 50;
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.line.strokeDasharray = "1,4";
        valueAxis.renderer.line.strokeOpacity = 0.5;
        valueAxis.cursorTooltipEnabled = false;
        valueAxis.min = 0;
        valueAxis.renderer.labels.template.disabled = true;

        var series = chart.series.push(new am4timeline.CurveColumnSeries());
        series.dataFields.categoryY = "category";
        series.dataFields.openValueX = 'openValue';
        series.dataFields.valueX = 'endValue';

        var columnTemplate = series.columns.template;
        series.tooltipText = "{description}";
        series.tooltip.fontSize = 16;
        columnTemplate.height = am4core.percent(80);
        columnTemplate.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index * 2);
        })
        columnTemplate.strokeOpacity = 0;
        columnTemplate.margin = am4core.percent(30);

        var cursor = new am4timeline.CurveCursor();
        chart.cursor = cursor;
        cursor.xAxis = valueAxis;
        cursor.yAxis = categoryAxis;
        cursor.lineY.disabled = true;
        cursor.lineX.strokeDasharray = "1,4";
        cursor.lineX.strokeOpacity = 1;

        timeLineRef.current = chart;
        return () => chart.dispose();
    }, []);

    return <Container id="baekhwaTimeline" ref={timeLineRef}></Container>
}

export default BaekhwagoTimeline;