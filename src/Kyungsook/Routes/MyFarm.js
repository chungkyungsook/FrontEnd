import React,{useState,useEffect} from 'react' ;
import '../Css/MyFarm.css';
import MyFarmComponent from '../Component/MyFarmComponent'
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import axios from 'axios';

const MyFarm = (props) => {

    //isLogin cookie 값 확인
    const isLoginCheck = props.cookies.get('isLogin')
    const url = '172.26.3.62'
    
    const [isOk, setIsOk] = useState({
        isDevice : false
    })

    //user 기기 정보 저장
    const [userDeviceInfo, setUserDeviceInfo] = useState({
        userInfo : []
    })
    const deviceGet = () =>{

        //user에 등록 된 기기 정보 가져오기
         axios.post(`http://${url}/api/myfarm/list`,{
             
                userId : props.cookies.get('userId')
                // userId : 'SZ4S71'
             
            
        }).then(data =>{
            setUserDeviceInfo({
                userInfo : data.data
            })
            
        }).catch(e=>{
            
        })

        setIsOk({
            isDevice : true
        })
    }
    //한번만 실행하기
    useEffect(()=>{
        //cookie상태값 확인하기
        // console.log("MyFarm page 로그인 상태 확인",props.cookies.get('isLogin'));
        // console.log("MyFarm page 토큰확인",props.cookies.get('token'));
        // console.log("MyFarm page email 확인",props.cookies.get('email'));
        // console.log("MyFarm page userId 확인",props.cookies.get('userId'));
    },)

    useEffect(()=>{
       console.log( "값 바뀜")
       console.log("userDeviceInfo", userDeviceInfo.userInfo.length !== 0)
       console.log("user",userDeviceInfo.userInfo,"server통신", isOk.isDevice);

    },[userDeviceInfo.userInfo,isOk.isDevice])

    //cookie 저장하기
    return (
        <>
        {
            !isLoginCheck ? (<Redirect to="/login" />) : 
            isOk.isDevice ? (<MyFarmComponent userDeviceInfo={userDeviceInfo.userInfo} 
                                              isOk={isOk.isDevice} />):
            (<div className="LodingText">Loding.... {deviceGet()} </div>)
            

        }
        {/* {
            !isLoginCheck ? (<Redirect to="/login" />) : (<MyFarmComponent userDeviceInfo={userDeviceInfo.userInfo} isOk={isOk.isDevice}/>)
        } */}
        </>
        
    );
};

export default withCookies(MyFarm);
