import React from 'react' ;
import styled from 'styled-components' ;
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
const Container = styled.div`
    /* 화면 크기 지정 */
    width: 100%;
    height: 88.6vh;
    background: rgb(224, 224, 218,00.3);
    display: flex;
    justify-content : space-around;
    padding : 10px;
    
`;

//3D프린터 박스
const Section1 = styled.div`
    display: flex;
    flex-direction : column;
    flex : 1;
    background : white;
    border: 1px solid black;
    border-radius : 10px;
    text-align:center;
    margin : 15px 10px;
    padding: 11px;
    margin: 15px 10px;
`;

//이름
const ItemName  = styled.div`
    flex: 0.3;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;
const Text      = styled.div`
    background: rgb(160,156,128,0.9);
    border-radius: 13px;
    padding: 10px;
`;
//3D프린터 구역
const ItemImg   =  styled.div`
    margin-top: 10px;
    background: rgb(118 94 70);
    border-radius: 13px;
    flex: 4;
`;

//프로그램 진척도,버섯 누적 수,버섯 산진 갤러리 박스
const Section2 = styled.div`
    
    flex : 2;
    display : flex;
    flex-direction : column;
    
    margin : 10px 5px;
    text-align:center;
`;


//진행중인 프로그램,(버섯 누적수 , 갤러리 ) 구역 2개로 나누기
const Item2  = styled.div`
    flex: 1;
    display: flex;
    flex-direction : column;
    border: 1px solid black;
    border-radius : 10px;

    background : white;
    margin :5px;
    padding: 15px;
`;

//진해중인 프로그램
const ProjectName  = styled.div`
    flex: 0.3;
    display: flex;
    justify-content: end;
    align-items: flex-end;
`;
//그래프 영역
const GrpBox   =  styled.div`
    margin-top: 10px;
    box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.22), 0 0 8px 0 rgba(0, 0, 0, 0.26);
    border-radius: 13px;
    flex: 4;
`;

//  버섯 누적 수,버섯 사진 갤러리 총 영역
const Item3  = styled.div`
    flex: 1;
    display: flex;
`;

//  버섯 누적 수,버섯 사진 갤러리 
const Item4  = styled.div`
    flex: 1;
    border: 1px solid black;
    border-radius : 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 5px;
    background: white;
    margin : 5px;
`;

// 버섯 상세 정보
const NumBox  = styled.div`
    box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.26); 
    border-radius : 5px;
    margin: 8px;
    flex-basis : 35%;
    background : #dddd;

    &:hover{
        background : rgb(145, 163, 119);
    }
`;
const Item5 = styled.div`
    flex: 1;
    border: 1px solid black;
    border-radius : 10px;
    display: flex;
    flex-direction:column;
    flex-wrap: wrap;
    padding: 5px;
    background: white;
    margin : 5px;
`;
// 갤러리 사진
const Photo   =  styled.div`
    margin-top: 10px;
    box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.22), 0 0 8px 0 rgba(0, 0, 0, 0.26);
    border-radius: 13px;
    flex: 1;
`;

//성장률, 버섯 길이 전체 영역
const InfoBoxs  = styled.div`
    box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.22), 0 0 8px 0 rgba(0, 0, 0, 0.26);
    flex: 1;
    flex-wrap : wrap;
    display: flex;
`;
//
const InfoBox  = styled.div`
    flex-basis: 45%;
    background: rgb(145, 163, 119,0.8);
    margin: 7px;
`;


const Farm = (props) => {
    //isLogin cookie 값 확인
    const isLoginCheck = props.cookies.get('isLogin')

    return (
        <>
        {
            !isLoginCheck ? (<Redirect to="/login" />) : (
        <Container>
            <Section1>
                
                <ItemName><Text>키노코짱</Text></ItemName>
                <ItemImg> 3D배지 구역</ItemImg>
                
            </Section1>
            
            <Section2>
                
                <Item2>
                    <ProjectName><Text>진행 중인 프로젝트</Text></ProjectName>
                    <GrpBox> 그래프 영역</GrpBox>
                </Item2>
                
                <Item3>

                    <Item4>
                        <NumBox>누적 버섯 갯수</NumBox>
                        <NumBox>현재 버섯 갯수</NumBox>
                        <NumBox>채취해야할 버섯 갯수</NumBox>
                        <NumBox>수확한 버섯 갯수</NumBox>
                    </Item4>

                    <Item5> 
                        <Photo> 버섯 갤러리</Photo>
                        <InfoBoxs>
                            <InfoBox>성장률</InfoBox>
                            <InfoBox>버섯 길이</InfoBox>
                        </InfoBoxs>
                    </Item5>

                </Item3>
            </Section2>

        </Container>)
         }
         </>
    ) ;
} ;

export default withCookies(Farm) ;