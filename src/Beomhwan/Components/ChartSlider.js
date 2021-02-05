import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useCustomChartInfo, useCustomChartList} from '../ChartContext';


// 차트의 전체 div
const ChartContainer = styled.div`
    width: ${props => props.width}px;
    height: 300px;
`;

// 차트 리스트 박스 div
const ChartListBox = styled.div`
    width: 902px;
    height: 300px;
    overflow: hidden;
    border: 1px solid gray;
    position: fixed;
`;

// 차트 하나의 크기 div
const ChartContentBox = styled.div`
    float: left;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
`;

const ChartStyle = styled.div`
    flex: 2;
`;

const ChartDescription = styled.div`
    flex: 1;
`;

const ChartSilder = () => {
    const [width, setWidth] = useState(0);
    const [x, setX] = useState(0);
    const chartInfo = useCustomChartInfo();
    const chartList = useCustomChartList();

    useEffect(() => {
        setWidth(chartList.length * 300);
    }, []);

    // x축 슬라이드 설정
    const onLeft = () => {
        
    }

    const onRight = () => {

    }

    return (
        <ChartListBox>
            <ChartContainer width={width}>
                {chartInfo.map((ch, index) => 
                <ChartContentBox>
                    <ChartStyle></ChartStyle>
                    <ChartDescription>{ch.prg_name}</ChartDescription>
                </ChartContentBox>
                )}
            </ChartContainer>
        </ChartListBox>
    );
};

export default ChartSilder;