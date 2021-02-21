import React, { useEffect } from 'react' ;
import styled from 'styled-components' ;
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import SwiperImg from './SwiperImg';
import KinokoImg from '../../../assets/KinokoImg/kinoko1.png' ;

//그래프
import ProgressChart from '../../../Beomhwan/Components/ProgressChart'

const FarmMock = ({cookies, imgList,onClick,kinoko}) => {
    //isLogin cookie 값 확인
    const isLoginCheck = cookies.get('isLogin')
    
    useEffect(()=>{
        console.log('===========Farm FarmMock 처음 실행 상태===========');
    },[])
    
    //값이 잘 들어 오는 지 확인
    useEffect(()=>{
        //전체 버섯의 정보
        imgList.kinokosList && console.log("FarmMock kinokoLists",imgList.kinokosList,imgList.kinokoNumber);
        console.log(imgList.kinokoNumber);

        
    },[imgList])


    return (
        <>
        {
             (
        <Container>
            <Section1>
                
                <ItemName><Text>키노코짱</Text></ItemName>
                {/* 3D배지 구역 */}
                <ItemImg>
                    {/*서버와 통신이 성공하면  */}
                    <LogoImg src={KinokoImg} draggable="false" width="200" alt={'버섯 배지 사진'}/>
                    <div>
                    {
                        imgList.kinokosList && (
                            imgList.kinokosList.map((data,index)=>(
                                // console.log(data),
                                data.mr_status !== "complete" && <button key={index} onClick={() => onClick(data)}>{data.id}</button>
                            ))
                        )
                    }
                    </div>
                </ItemImg>
                
            </Section1>
            
            <Section2>
                
                <Item2>
                    <ProjectName><Text>진행 중인 프로젝트</Text></ProjectName>
                    <GrpBox>
                        <ProgressChart />
                    </GrpBox>
                </Item2>
                
                <Item3>

                    <Item4>

                        <NumBox>
                            <div>누적 버섯 갯수</div>
                            <KinokoInfoNumber>{imgList.kinokoNumber.allKinoko}</KinokoInfoNumber>
                        </NumBox>
                        <NumBox>
                            현재 버섯 갯수
                            <KinokoInfoNumber>{imgList.kinokoNumber.thisKinoko}</KinokoInfoNumber>
                        </NumBox>
                        <NumBox>
                            채취해야할 버섯 갯수
                            <KinokoInfoNumber>{imgList.kinokoNumber.getKinoko}</KinokoInfoNumber>
                        </NumBox>
                        <NumBox>
                            수확한 버섯 갯수
                            <KinokoInfoNumber>{imgList.kinokoNumber.endKinoko}</KinokoInfoNumber>
                        </NumBox>
                    </Item4>

                    <Item5> 
                        <Photo> 버섯 갤러리
                            <SwiperImg kinoko={kinoko}/>
                        </Photo>
                        <InfoBoxs>
                            <InfoBox>
                                성장률
                                <KinokoInfoNumber>{kinoko && kinoko.percent}</KinokoInfoNumber>
                            </InfoBox>
                            <InfoBox>
                                버섯 길이
                                <KinokoInfoNumber>{kinoko && kinoko.cm}</KinokoInfoNumber>
                            </InfoBox>
                        </InfoBoxs>
                    </Item5>

                </Item3>
            </Section2>

        </Container>)
         }
         </>
    ) ;
} ;

//이미지 그림 css
const LogoImg = styled.img`

    background-position : center ;
        
    margin-right : 0.5rem ;
    margin-left : 1rem ;
    /* margin : 100px; */
    padding-top: 170px;
    text-align : center;
    width: 192px;
    cursor : default ;
`;


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

const KinokoInfoNumber = styled.div`
    text-align: center;
    display : flex;
    font-size : 20px;
    /* flex : 1; */
    flex-direction:column;
`
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
    /* flex: 1; */
    height : 150px;
     
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


export default withCookies(FarmMock) ;