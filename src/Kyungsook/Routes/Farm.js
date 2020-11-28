import React from 'react' ;
import styled from 'styled-components' ;

const Container = styled.div`
    /* 화면 크기 지정 */
    width: 1920px;
    height: calc(1080px - 70px);      
    background: rgb(224, 224, 218,00.3);
    display: flex;
    justify-content : space-around;
    padding : 10px;
    
`;

//3D프린터 박스
const Section1 = styled.div`
    flex : 1;
    background : white;
    border: 1px solid black;
    border-radius : 10px;
    text-align:center;
    margin : 15px 10px;
`;
//3D프린터 구역
const Item1  = styled.div`
    flex : 1;
`;


//프로그램 진척도,버섯 누적 수,버섯 산진 갤러리 박스
const Section2 = styled.div`
    
    flex : 2;
    display : flex;
    flex-direction : column;
    
    margin : 10px 5px;

    /* border: 1px solid black;
    border-radius : 15px; */

    text-align:center;
`;


//진행중인 프로그램,(버섯 누적수 , 갤러리 ) 구역 2개로 나누기
const Item2  = styled.div`
    flex: 1;
    display: flex;
    border: 1px solid black;
    border-radius : 10px;

    background : white;
    margin :5px;
`;
const Item3  = styled.div`
    flex: 1;
    display: flex;
`;

//  버섯 누적 수,버섯 사진 갤러리 
const Item4  = styled.div`
    flex: 1;
    border: 1px solid black;
    border-radius : 10px;

    background: white;
    margin : 5px;
`;

const Farm = () => {
    return (
        <Container>
            <Section1>
                <Item1>3D프린터</Item1>
            </Section1>
            
            <Section2>
                
                <Item2>프로그램</Item2>
                
                <Item3>
                    <Item4>버섯 누적 수</Item4>
                    <Item4>버섯 사진 갤러리</Item4>
                </Item3>
            </Section2>

        </Container>
    ) ;
} ;

export default Farm ;