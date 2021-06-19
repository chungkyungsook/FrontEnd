import {useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4timeline from '@amcharts/amcharts4/plugins/timeline';

const Container = styled.div`
    width: 100%;
`;

const PyogoTimeLine = () => {
    const timeLineRef = useRef();

    useLayoutEffect(() => {
        am4core.useTheme(am4themes_animated);
        const colorSet = new am4core.ColorSet();

        const timeline = am4core.create('pyogoTimeline', am4timeline.SerpentineChart);


        timeLineRef.current = timeline;
        return () => timeLineRef.current.dispose();
    }, []);

    return <div id="pyogoTimeline" ref={timeLineRef}></div>
}

export default PyogoTimeLine;