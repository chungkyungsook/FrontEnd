import React from 'react' ;
import styled from 'styled-components';
const Container   = styled.div`

    width : 100%;
    display: flex;
    padding : 50px;
    background      :rgb(224, 224, 218);

`;

const Section1    = styled.div`
    height : 83vh;
    display:flex;
    flex : 1;
    flex-direction : column;
    margin : 0 20px;
    border-radius : 20px;
`;
const Item1 = styled.div`
    flex : 3;
    border: 1px solid black;
    border-radius : 10px;
    background: white;
    margin-bottom: 10px;
`;
const Item2 = styled.div`
    display: flex;
    justify-content : space-evenly;
    align-items : center;
    background: white;
    border: 1px solid black;
    border-radius : 10px;
    flex : 1;
`;
const KinokoIcons = styled.div`
    text-align : center;
    background : #ddd;
    width : 150px;
    height : 150px;
`;

const Section2    = styled.div`
    height  : 83vh;
    flex : 1;
    margin : 0 20px;
    padding : 10px;
    /* flex-basis : 40vh; */
    background: white;
    border: 1px solid black;
    border-radius : 20px;
`;

const Help = () => {
    return (
        <Container>
            <Section1> 
                <Item1></Item1>
                <Item2>
                    <KinokoIcons>1</KinokoIcons>
                    <KinokoIcons>2</KinokoIcons>
                    <KinokoIcons>3</KinokoIcons>
                    <KinokoIcons>4</KinokoIcons>
                </Item2>
            </Section1>
            <Section2> 기기 사용 방법은 추후 추가할 예정</Section2>
        </Container>
    );
};

export default Help ;