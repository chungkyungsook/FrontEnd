import React from 'react' ;
import styled from 'styled-components' ;

const Container = styled.div`
    height: calc(100vh - 114px);    
    background: rgb(224, 224, 218,00.3);
    display: flex;
    justify-content : space-around;
    
`;
const Section1 = styled.div`
    flex : 1;
    background : white;
    border: 1px solid black;
    border-radius : 10px;
    text-align:center;
    margin : 10px 5px;
`;
const Section2 = styled.div`
    flex : 2;
    background : white;
    border: 1px solid black;
    border-radius : 10px;
    text-align:center;
    margin : 10px 5px;
`;

//3D프린터
const Item1  = styled.div`
    flex : 2;
`;
//프로그램 진척도
const Item2  = styled.div`
    flex : 1;
`;
//버섯 누적 수
const Item3  = styled.div`
    flex : 1;
`;
//버섯 산진 갤러리
const Item4  = styled.div`
    flex : 1;
`;
const Farm = () => {
    return (
        <Container>
            <Section1>
                <Item1>3D프린터</Item1>
            </Section1>
            
            <Section2>
                <Item2>프로그램</Item2>
                <Item3>버섯 누적 수</Item3>
                <Item4>버섯 사진 갤러리</Item4>
            </Section2>

        </Container>
    ) ;
} ;

export default Farm ;