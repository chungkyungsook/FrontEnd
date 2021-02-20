// MyFarm 전체 내용
import React, { useEffect, useState } from 'react' ;
import '../Css/MyFarm.css';
import {Link} from 'react-router-dom';
import styled from 'styled-components' ;
import ModalMain from '../Component/Modals/ModalMain';
import ModalDeviceMain from '../Component/Modals/ModalDeviceMain';
import Progress from '../Component/Progress'

//그림 리소스
import Kinoko1 from '../../assets/KinokoImg/kinoko1.png' ;
import Kinoko2 from '../../assets/KinokoImg/kinoko2.png' ;
import axios from 'axios';
import { withCookies } from 'react-cookie';

import {
    DEBUG
} from '../../Util/debugging.js'

const MyFarmComponent = (props) => {

    //user 기기 관리 정보, 서버 통신 완료 시 isOk : true
    const {userDeviceInfo,value,setting,isLoding,day} = props
    
    //선택하 기기 정보 저장
    const [userInfo, setUserInfo] = useState({
        user : '',
        changUser : false
    })
    // const url = '172.26.3.62'
    const url = '54.210.105.132'

    // const [isOn, setIsOn] = useState('')

    //선택한 기기 정보 저장하기
    const deviceNum = (data)=>{
        DEBUG && console.log("userInfo. changUser", userInfo.changUser)

        //선택한 재배기 id저장
        setUserInfo({
            ...userInfo,
            user : data.id
        })
    }

    //false : 앞, true : 뒤
    const [img, setImg] = useState(false)

    const imgChang = () =>{
        img ? setImg(false) : setImg(true)
    }

    //진행중인 프로그램 이름 및 프로그램 id 
    

    const kinokoInfo = ()=>{
        console.log("MyFarm in MyfarmComponent kinokoInfo 실행");
        
    }

    useEffect(()=>{
        (console.log("==================MyFarmComponent 처음 실행 화면 =================="));
        
    },[])

    //userInfo값이 변경 되면 실행
    useEffect(()=>{
        console.log('MyFarm userInfo 선택된 값들',userInfo.user)

        //값 새롭게 가져오기
        // userInfo.changUser && value.setIsOn({...value.isOn, id : userInfo.user})
        setUserInfo({
            ...userInfo,
            changUser : false
        })

        kinokoInfo()
    },[userInfo.user])

    useEffect(()=>{
        
        DEBUG && console.log("MyFarmCom... isOn 값 변경",value.isOn.id)
        DEBUG && console.log("MyFarmCom... isOn 값 변경",value.isOn.prgName)

    },[value.isOn.id])

    return (
        <div className="container">
            
            {/* 기기관리 */}
            <div className="item item1">

                <div className = "item1Text"> 재배기 관리</div>
                <div className = "item1ButtonBox">   
                    {/* 기기 모달창*/}
                    <ModalDeviceMain userDeviceInfo={userDeviceInfo} deviceNum={deviceNum} 
                                     setUserInfo={setUserInfo} userInfo={userInfo} value={value} />
                    {/* 모달 창 */}
                    <ModalMain/>
                </div>

            </div>{/* 기기관리 끝*/}
            {/* 해당 user에 등록된 기긱가 없을 때 */}
            { 
            isLoding ? 
            ( userDeviceInfo.length === 0 ? (<div className="item item4"> 재배기를 등록 해 주세요</div> )
            : (value.isOn.id === 0 ? (<div className="item item4"> 선택 된 재배기가 없습니다. 재배기를 선택해 주세요</div> )
            : 
            (
                <>
                <div className="item item2">
                <div className = "box1 kinokoImgBox">
                    <input className = "kinokoName" />

                    {/* 버섯 이미지 */}
                    <div className = "kinokoImg">
                        <LogoImg src={img ? Kinoko2 : Kinoko1} draggable="false" width="200"/>
                    </div>
                    <div className = "kinokoBtn" onClick={imgChang}>{
                       img ? "뒤" : "앞" 
                    } </div>
                </div>
                {/* 온도,습도 */}
                {/* value: 온도,습도 별 값  */}
                <div className = "box1 environment">
                    <div className = "box2 progress">
                        <span className="span">온도</span>
                        <Progress color={'secondary'} value={setting.temperature} name={'온도'}/>
                    </div>       
                    <div className = "box2 progress">
                        <span className="span">습도</span>
                        <Progress value={setting.humidity}/>
                    </div>       
                </div>

            </div>

            <div className="item item3">
                <div className = "graph">그래프 구역</div>
                <div className = "notification">
                    <div className = "programName">
                        <div>진행중인 프로그램 이름</div>
                        <div>{value.prgInfo.name && value.prgInfo.name}</div>
                        <br/>
                        <div>{day && day.today}</div>
                    </div>
                    <div className = "smailInfo">
                        <h1>오늘은 버섯이 {0}개 자랐습니다.</h1>
                        <h1>아직 수확할 버섯은 없네요</h1>
                    </div>
                </div>
                
                <Link to="/farm">
                    <button className="pageInfo">상세 페이지</button>
                </Link>
            </div>
            </>
            )
            
            )) : 
            (<div className="item item4"> Loding...</div> )
            }
        </div>
    );
};

//이미지 그림 css
const LogoImg = styled.img`

    background-position : center ;
        
    margin-right : 0.5rem ;
    margin-left : 1rem ;

    padding-top: 70px;

    cursor : default ;
    `;

export default withCookies(MyFarmComponent) ;
