import React, { useEffect } from 'react' ;
import '../Css/MyFarm.css';
import {Link} from 'react-router-dom';
import ModalMain from '../Component/Modals/ModalMain';
import ModalDeviceMain from '../Component/Modals/ModalDeviceMain';

const MyFarmComponent = (props) => {
    //user 기기 관리 정보, 서버 통신 완료 시 isOk : true
    const {userDeviceInfo,isOk} = props
    useEffect(()=>{
        console.log("userdeviceInfo",userDeviceInfo, "isOk",isOk);
    },[isOk === true])

    //기기 번호 출력
    const deviceNum = (data)=>{
        console.log("디바이스 정보" ,data)
    }
    
    return (
        <div className="container">
            
            {/* 기기관리 */}
            <div className="item item1">

                <div className = "item1Text"> 기기 관리</div>
                <div className = "item1ButtonBox">   
                    {/* {
                        userDeviceInfo.map(data=>(
                            
                            <div className = "item1Button" onClick={()=> deviceNum(data)}>
                                {data.machine_name} 
                                <ModalDeviceMain/>
                            </div>
                            ))
                    } */}
                    {/* 기기 */}
                    <ModalDeviceMain userDeviceInfo={userDeviceInfo} deviceNum={deviceNum}/>
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
                <div className = "box1 environment">
                    <div className = "box2 temperature">온도</div>       
                    <div className = "box2 humidity">습도</div>       
                </div>
            </div>

            <div className="item item3">
                <div className = "graph">그래프 구역</div>
                <div className = "notification">
                    <div className = "programName">진행중인 프로그램 이름</div>
                    <div className = "smailInfo">간략한 상태 정보</div>
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
