// MyFarm 전체 내용
import React, { useEffect, useState } from 'react' ;
import '../Css/MyFarm.css';
import {Link} from 'react-router-dom';
import ModalMain from '../Component/Modals/ModalMain';
import ModalDeviceMain from '../Component/Modals/ModalDeviceMain';
import Progress from '../Component/Progress'

const MyFarmComponent = (props) => {
    //user 기기 관리 정보, 서버 통신 완료 시 isOk : true
    const {userDeviceInfo,isOk} = props
    
    //선택하 기기 정보 저장
    const [userInfo, setUserInfo] = useState({
        user : ''
    })

    //기기 정보 및 서버 통신 됐는지 확인
    // useEffect(()=>{
    //     console.log("userdeviceInfo",userDeviceInfo, "isOk",isOk);
    // },[isOk,userDeviceInfo])

    // useEffect(()=>{
    //     console.log("MyFarmCom 선택한 user 기기 ",userInfo.user)    
    // })

    //선택한 기기 정보 저장하기
    const deviceNum = (data)=>{
        setUserInfo({
            user : data
        })
    }

    //선택한 기기 가져오기


    return (
        <div className="container">
            
            {/* 기기관리 */}
            <div className="item item1">

                <div className = "item1Text"> 기기 관리</div>
                <div className = "item1ButtonBox">   
                    {/* 기기 모달창*/}
                    <ModalDeviceMain userDeviceInfo={userDeviceInfo} deviceNum={deviceNum} 
                                     setUserInfo={setUserInfo} userInfo={userInfo}  />
                    {/* 모달 창 */}
                    <ModalMain/>
                </div>

            </div>{/* 기기관리 끝*/}
            
            { userDeviceInfo.length === 0 ? <div className="item item4"> 기기 등록을 해 주세요</div> 
            : 
            (
                <>
                <div className="item item2">
                <div className = "box1 kinokoImgBox">
                    <input className = "kinokoName" />
                    <div className = "kinokoImg"> 버섯 사진 영역</div>
                    <div className = "kinokoBtn"> 앞 </div>
                </div>
                {/* 온도,습도 */}
                {/* value: 온도,습도 별 값  */}
                <div className = "box1 environment">
                    <div className = "box2 progress">
                        <span className="span">온도</span>
                        <Progress color={'secondary'} value={20} name={'온도'}/>
                    </div>       
                    <div className = "box2 progress">
                        <span className="span">습도</span>
                        <Progress value={70}/>
                    </div>       
                </div>

            </div>

            <div className="item item3">
                <div className = "graph">그래프 구역</div>
                <div className = "notification">
                    <div className = "programName">
                        <div>진행중인 프로그램 이름</div>
                        <div>키노코</div>
                        <br/>
                        <div>0일차</div>
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
            
            
            }
        </div>
    );
};

export default MyFarmComponent ;
