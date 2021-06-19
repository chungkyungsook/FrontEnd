import React, { useEffect, useState } from 'react'
import { withCookies} from 'react-cookie';
import '../../Css/help.css'
import kinokoImg      from '../../../assets/logoHeight.png' ;
import noteBg from '../../../assets/notebg.png';
import kinokoImg1 from '../../../assets/kinokoImg1.png';
import kinokoImg2 from '../../../assets/kinokoImg2.png';
import kinokoImg3 from '../../../assets/kinokoImg3.png';
import kinokoImg4 from '../../../assets/kinokoImg4.png';
import {userSelect} from '../../../Util/css' ;

//슬라이더
import SwiperCore from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import axios from 'axios';

import {
    AWS_URL
} from '../../../Util/api.js'

const HelpCss = ({list,kinokoInfo, onClick}) =>{
    
    useEffect(()=>{
        
    },[])

    useEffect(()=>{
        console.log('help css', kinokoInfo);
    },[kinokoInfo])

    return(
        <div className='help-wrap'>
          <div className='inner'>

            <div className='help-left'>

              <div className='kinoko-info-group'>
                <div className='info-img-box'>
                  
                  <div className='info-img'>사진 구역</div>
                  <div className='info-list'>버섯 정보</div>
                  <img src={kinokoImg} draggable="false" alt='logoimg' className='logo-img'/>

                </div>
              </div>

              <div className='info-box'>
                  <div className='infoBtn-box'>
                    <div className='kinoko-info'>버섯 1</div>
                    <div className='kinoko-info'>버섯 1</div>
                    <div className='kinoko-info'>버섯 1</div>
                  </div>
              </div>
            </div>


            <div className='help-right'>
              
              <div className='right-wrap'>
                <img src={noteBg}  draggable='false'alt='Note' className='note-img'/>
                <img src={noteBg}  draggable='false' alt='Note' className='note-img'/>
                
                <div className='text-wrap'>
                  <h1 clasName='help-title'>재배기 사용 방법!</h1>
                  <div className='kinokoImg1-text'>1. 재배기에 표고버섯 배지를 넣습니다.</div>
                  <img src={kinokoImg1} alt='kinokoImg1' className='kinokoImg1'/>
                  <img src={kinokoImg2} alt='kinokoImg2' className='kinokoImg2'/>
                  <div className='kinokoImg2-text'>2. 마이 팜 페이지에 해당 재배기 정보를 등록합니다.(재배기 PIN 번호, 패스워드)</div>
                  <div className='kinokoImg3-text'>3. 팜 환경 설정 페이지에서 표고버섯을 키울 환경을 직접 설정합니다.</div>
                  <img src={kinokoImg3} alt='kinokoImg3' className='kinokoImg3'/>
                  <img src={kinokoImg4} alt='kinokoImg4' className='kinokoImg4'/>
                  <div className='kinokoImg4-text'>4. 팜 정보 페이지에서 표고버섯의 성장 정보를 볼 수 있습니다.</div>
                </div>
              </div>
            </div>


          </div>
        </div>
    )

    // return (
    // <Container>
    //         <Section1> 
                
    //             <Item1>
                    
    //                 <Item1Img> {/* 선택한 버섯 이미지 */}
    //                     <KinokoImg>
    //                         <KinokoImage
    //                             src={`${AWS_URL}/api/help/image/${kinokoInfo.thumnail_url}`}
    //                             alt={kinokoInfo.name}
    //                         />
    //                     </KinokoImg>
    //                     <Text>{kinokoInfo.name}</Text>
    //                 </Item1Img>

    //                 <Item1Info> {/* 선택한 버섯 정보 */}
    //                     <Img     src={title}      width="50" height="50"  draggable="false" />
    //                     <KinokoInfo>
    //                         <KinoText dangerouslySetInnerHTML={{__html:kinokoInfo.effect}}></KinoText>
    //                         <KinoText dangerouslySetInnerHTML={{__html:kinokoInfo.environment}}></KinoText>
    //                     </KinokoInfo>
    //                 </Item1Info>

    //             </Item1>
                
    //             <Item2> {/* 버섯 종류 아이콘 */}
    //                 {list && list.map((data,index) =>(
    //                     <KinokoIcons onClick={()=> onClick(data)} key={index}>
    //                          <KinokoImage src={`${AWS_URL}/api/help/image/${data.thumnail_url}`} alt={data.name}/>
    //                          <Text>{data.name}</Text>
    //                     </KinokoIcons>
    //                 ))}
    //             </Item2>
    //         </Section1>
    // <Section2> 기기 사용 방법은 추후 추가할 예정</Section2>
    // </Container>
    // )
}
// const HelpWrap   = styled.div`
//   height: calc(100% - 70px);
// `;


  
// // 전체 틀
// const Section1    = styled.div`
//     height : 83vh;
//     display:flex;
//     flex : 1;
//     flex-direction : column;
//     margin : 0 20px;
//     border-radius : 20px;
// `;

// // 버섯 정보 구역
// const Item1 = styled.div`
//     flex : 3;
//     display: flex;
//     border: 1px solid black;
//     border-radius : 10px;
//     background: white;
//     margin-bottom: 10px;
// `;

// const Item1Img = styled.div`
//     flex : 1.6;
//     justify-content : center;
//     /* background : green; */
//     margin : 5px;
//     display: flex;
//     flex-direction : column;
//     justify-content : center;
//     align-items : center;
// `;

// //선택한 키노코 이미지
// const KinokoImg = styled.div`
//     box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.06);
//     width  : 170px;
//     height : 170px;
//     border-radius : 23px;
//     margin : 5px;
//     text-align : center;
//     padding-top : 20px;
//     user-select : none ;
// `;
// const Text = styled.div`
//     /* flex: 1; */
//     padding : 5px;
//     padding-top: 5px;
// `;

// const Item1Info = styled.div`
//     margin : 10px;
//     flex : 4;
//     display: flex;
//     flex-direction : column;
//     justify-content: center;
//     align-items : center;
// `;


// //선택한 버섯 정보
// const KinokoInfo = styled.div`
//     box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.06);
//     width: 448px;
//     height: 370px;
//     display: flex;
//     align-items: center;
//     /* text-align :center; */
//     /* line-height : 370px; */
// `;

// const KinoText = styled.span`
//     width : 100%;
//     text-align : center;
//     padding : 5px;
// `

// //이미지
// const Img = styled.img`
    
//     ${userSelect}

//     cursor : default ;


// `;

// //버섯 아이콘 구역
// const Item2 = styled.div`
//     display: flex;
//     justify-content : space-evenly;
//     align-items : center;
//     background: white;
//     border: 1px solid black;
//     border-radius : 10px;
//     flex : 1;

// `;

// //버섯 아이콘
// const KinokoIcons = styled.div`
//     text-align : center;
//     /* background : #ddd; */
//     box-shadow      : 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.06);
//     width : 150px;
//     height : 150px;
//     margin : 5px;
    
//     &:hover{
//         background : #ddd;
//     }
// `;

// const KinokoImage = styled.img`
//     width: 144px;
//     height: 115px;
//     margin-top: 1px;
// `;

// //기기 사용법 구역
// const Section2    = styled.div`
//     text-align : center;
//     line-height : 83vh;
//     height  : 83vh;
//     flex : 1;
//     margin : 0 20px;
//     padding : 10px;
//     /* flex-basis : 40vh; */
//     background: white;
//     border: 1px solid black;
//     border-radius : 20px;
// `;

export default withCookies(HelpCss);