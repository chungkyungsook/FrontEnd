// MyFarm 전체 내용
import React, { useEffect, useRef, useState } from 'react' ;
import '../../Css/MyFarm.css';
import {Link} from 'react-router-dom';
import styled from 'styled-components' ;
import ModalMain from '../../Component/Modals/ModalMain';
import ModalDeviceMain from '../../Component/Modals/ModalDeviceMain';
import Progress from '../../Component/Progress'

//그림 리소스
import Kinoko1 from '../../../assets/KinokoImg/kinoko1.png' ;
import Kinoko2 from '../../../assets/KinokoImg/kinoko2.png' ;
import axios from 'axios';
import { withCookies } from 'react-cookie';

import LogoutChart from '../../../Beomhwan/Components/LogoutChart';
import {
    DEBUG
} from '../../../Util/debugging.js'

import { format } from 'date-fns';
import FileBase64 from './FileBase64';

const MyFarmCss = ({value,isLoding,result2,onClickChangeName,onChange,temp,image,temperature,humidity}) => {

    //선택하 기기 정보 저장
    const [userInfo, setUserInfo] = useState({
        user : '',
        changUser : false
    })

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
    
    const [number,setNumber] = useState(null)
    useEffect(()=>{
        (console.log("==================MyFarmCss 처음 실행 화면 =================="));
        // let today = new Date('yyyy MM dd')

        if(result2.growing){
            // console.log(today);
            setNumber(result2.growing.filter(data => format(new Date(data.mr_date),'yyyy-MM-dd') === result2.day.today))
        }else(
            setNumber(null)
        )
        console.log("값이 바뀜",result2.growing);

        console.log( result2.day.today);

    },[result2.growing])

    //userInfo값이 변경 되면 실행
    useEffect(()=>{
        console.log('MyFarm userInfo 선택된 값들',userInfo.user)

        //값 새롭게 가져오기
        setUserInfo({
            ...userInfo,
            changUser : false
        })

    },[userInfo.user])

    useEffect(()=>{
        
        DEBUG && console.log("MyFarmCom... isOn 값 변경",value.isOn.id)
        DEBUG && console.log("MyFarmCom... isOn 값 변경",value.isOn.prgName)

    },[value.isOn.id])

    useEffect(()=>{
        console.log("오늘은 며칠?", result2.day.today,"버섯 재배 날짜는?", result2.day.kinokoDay);
        if(result2.day.today !== '' ){
        let test = new Date(result2.day.today)
        let test2 = new Date(result2.day.kinokoDay)

        console.log((test.getTime() - test2.getTime()) / (1000*60*60*24));
        } 
        
    },[result2.day])   

    useEffect(()=>{
        if(value.prgInfo.prg_id === 0 ){
            temp.setGrowing([])
            temp.setHarvest([])
            temp.setWhiteflower([])
        }
    },[value.prgInfo.prg_id])
    
    useEffect(()=>{
        console.log('온도',temperature);
        console.log('습도',humidity);
        
    },[temperature,humidity])
    

    return (
        <div className="container">
            
            {/* 기기관리 */}
            <div className="item item1">

                <div className = "item1Text"> 재배기 관리</div>
                <div className = "item1ButtonBox">   
                    {/* 기기 모달창*/}
                    <ModalDeviceMain userDeviceInfo={result2.userDeviceInfo.userInfo} deviceNum={deviceNum} 
                                     setUserInfo={setUserInfo} userInfo={userInfo} value={value} />
                                        
                    {/* 모달 창 */}
                    <ModalMain/>
                </div>

            </div>{/* 기기관리 끝*/}
            {/* 해당 user에 등록된 기긱가 없을 때 */}
            { 
            isLoding ? (
             result2.userDeviceInfo.userInfo.length === 0 ? (<div className="item item4"> 재배기를 등록 해 주세요</div> )
                    : value.isOn.id === 0 ? 
                    (<div className="item item4"> 선택 된 재배기가 없습니다. 재배기를 선택해 주세요</div> ) :
            (
                <>
                <div className="item item2">
                
                <div className = "box1 kinokoImgBox">
                
                    <div>                
                        { result2.isNameChange ? (<div>{result2.kinokoName}</div>) 
                        : (
                        <>
                            <input style={{wid th: '262px'}} placeholder={value.prgInfo.prg_id !== 0 ? "이름을 입력해 주세요" : "프로그램이 없으면 이름을 바꿀수 없어요"}  onChange={onChange}/> 
                            <button name="changeName" onClick={onClickChangeName}>이름 바꾸기</button>
                        </>)}
                    </div>
                    {/* 버섯 이미지 */}
                    <div className = "kinokoImg">
                        <img src={image} alt='버섯 실시간 사진' width="400px" height="505px" />
                    </div>
                    <div className='kinokoBtns'>
                    { result2.isNameChange ?  (<button name='name' className="change_name" onClick={onClickChangeName}>이름 바꾸기</button>) : null}
                    </div>
                </div>
                {/* 온도,습도 */}
                {/* value: 온도,습도 별 값  */}
                <div className = "box1 environment">
                    <div className = "box2 progress">
                        <span className="span">온도</span>
                        <Progress color={'secondary'} value={temperature} name={'온도'}/>
                    </div>       
                    <div className = "box2 progress">
                        <span className="span">습도</span>
                        <Progress value={humidity}/>
                    </div>       
                </div>

            </div>

            <div className="item item3">
                <div className = "graph">
                    <LogoutChart value={value}/>
                </div>
                <div className = "notification">
                    <div className = "programName">
                        <div>진행중인 프로그램 이름</div>
                        <div>{value.prgInfo.prg_name}</div>
                        <br/>
                        <div>진행 상태 : {result2.day && result2.days+1}일차</div>
                    </div>
                    <div className = "smailInfo">
                        <h1>오늘은 표고버섯이 {number ? number.length : 0}개 자랐습니다.</h1>
                        <h1>{ result2.harvest.length !== 0  ? '수확할 때가 왔습니다!! 상세 페이지에서 확인해 주세요.' : '아직 수확할 버섯은 없네요'}</h1>
                        <h1>{ result2.whiteflower.length !== 0 ?  '백화고가 자라났습니다! 상세 페이지에서 확인해 주세요' : result2.whiteflower}</h1>
                    </div>
                </div>
                
                <Link to="/farm">
                    <button className="pageInfo">상세 페이지</button>
                </Link>
            </div>

            </>
            )) : (<div className="item item4"> Loding...</div> )
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

export default withCookies(MyFarmCss) ;