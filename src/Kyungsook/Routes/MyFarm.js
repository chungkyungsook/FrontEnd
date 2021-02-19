import React,{useState,useEffect} from 'react' ;
import '../Css/MyFarm.css';
import MyFarmComponent from '../Component/MyFarmComponent'
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import axios from 'axios';

import {
    AWS_URL,
    MACHINE_LIST,
    PRG_NAME,
    MUSHROOM_ALL
} from '../../Util/api.js'

import {
    DEBUG
} from '../../Util/debugging.js'

import MyfarmInfo from '../Component/MyfarmInfo';

const MyFarm = (props) => {
///////////////////////////////////////////////////////////////////////   변수
    //isOn : 선택한 기기 정보, 재배기 이름 / isValue : 기기 작동상태    
    const {value} = props
    //user 기기 정보 저장
    const [userDeviceInfo, setUserDeviceInfo] = useState({
        userInfo : []
    })

    // 재배기 온도, 습도 값 저장
    const [setting, setSetting] = useState({
        temperature : 0, //온도
        humidity : 0,    //습도
    })

    const [isOk, setIsOk] = useState({
        isDevice :false
    })

    const [isLoding, setIsLoding] = useState(false)
///////////////////////////////////////////////////////////////////////    

    //해당 함수에서 버섯의 모든 정보를 가져온다.
    const deviceGet = () =>{

        //user에 등록 된 기기 정보 가져오기
        axios.post(`${AWS_URL}${MACHINE_LIST}`,{
            userId : props.cookies.get('userId')
        }).then(data =>{
            console.log('Myfarm 등록된 기기 정보 가져오기',data.data)
            setUserDeviceInfo({
                userInfo : data.data
            })
            setIsLoding(true)
        }).catch(e=>{
            e.response.status === 404 && console.log( e.response.status,"등록된 버섯 재배기 정보 읎음");
            console.log( e.response.status,"등록된 버섯 재배기 정보 가져오기 실패");
        })

        //등록된 버섯 재배기 정보 가져오기 성공
        setIsOk({
            isDevice : true
        })

        // 버섯 프로그램 실행 일차 
        
        //당일날 자란 버섯의 갯수
        
        //수확할 버섯 수

        //등록된 버섯 재배기 온도,습도 값 결정해 주기
        setSetting(
            {temperature : 20, humidity : 80}
        )
        
        //버섯 자란 수
        //수확할 버섯 확인
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
    //한번만 실행하기
    useEffect(()=>{
        console.log("====================MyFarm 처음 실행 화면 ===================");
        // cookie상태값 확인하기
        DEBUG && console.log("MyFarm page 토큰확인",props.cookies.get('token'));
        DEBUG && console.log("MyFarm page email 확인",props.cookies.get('userId'));
        
    },[])

    useEffect(()=>{
        console.log("=================Myfarm===================="); //선택하면 값이 바뀜
        // cookie상태값 확인하기
        DEBUG && console.log("MyFarm ", value.isOn)
        
        
    },[value.isOn.prgName])

   
    
    
    //cookie 저장하기
    return (
        <>
        {
            props.cookies.get('token')? 
            (isOk.isDevice ? //재배기 있나요? yes
                (   <>
                        <MyfarmInfo value={value}/>
                        <MyFarmComponent 
                        userDeviceInfo={userDeviceInfo.userInfo} 
                        isOk={isOk.isDevice} 
                        value={value} 
                        setting={setting}
                        isLoding={isLoding}
                        />
                    </>
                ) : //no -> 처음 한번 실행 
                (
                    <div className="LodingText">Loding.... {deviceGet()} </div>
                ))
            :
            (
                <Redirect to ="/login"/>
            )
        }

        </>
        
    );
};

export default withCookies(MyFarm);
