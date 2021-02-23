import React,{useState,useEffect} from 'react' ;
import '../Css/MyFarm.css';
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import axios from 'axios';

import {
    AWS_URL,
    MACHINE_LIST, //재배기 목록
    PRG_NAME, // 프로그램 이름,id
    MUSHROOM_ALL, //모든 버섯 상태 가져오기
    DATE, //재배기 실행 날짜
    MACHINE_ID, //재배기 id가져오기 
    MACHINE_STATUS, //재배기 상태 가졍괴
} from '../../Util/api.js'

import {
    DEBUG,
    HEADER_DEBUG
} from '../../Util/debugging.js'

import MyfarmInfo from '../Component/MyfarmComponent/MyfarmInfo'; //정보 값 가져오기
import MyfarmCss from '../Component/MyfarmComponent/MyfarmCss';   // 해당 페이지 보여주기

import {format} from 'date-fns';
const MyFarm = ({cookies,value,logoutOnClick}) => {
///////////////////////////////////////////////////////////////////////   변수
    //user 기기 정보 저장
    const [userDeviceInfo, setUserDeviceInfo] = useState({
        userInfo : []
    })

    //오늘 날짜, 키노코 키운 날짜
    const [day, setDay] = useState({
        today :  '',
        kinokoDay : ''
    })

    // 재배기 온도, 습도 값 저장
    const [setting, setSetting] = useState({
        temperature : 0, //온도
        humidity : 0,    //습도
    })

    //재배기 정보 가져기
    const [isOk, setIsOk] = useState({
        isDevice :false
    })

    //로딩화면 보여주기
    const [isLoding, setIsLoding] = useState(false)

    //버섯 배지 이름 저장
    const [kinokoName, setKinokoName] = useState('')
    
///////////////////////////////////////////////////////////////////////    실행 함수
    
    // 1번. user에 등록 된 기기 정보 가져오기
    async function machine_list () {

        //user에 등록 된 기기 정보 가져오기
        await axios.post(`${AWS_URL}${MACHINE_LIST}`,{
            // param :  { token : cookies.get('token') }
            token : cookies.get('token') 
        }).then(data =>{
            console.log('Myfarm 등록된 기기 정보 가져오기',data.data)
            //등록된 버섯 재배기 정보 가져오기 성공
            if(data.data === '이미 만료된 토큰'){
                return () => { 
                    setIsOk({isDevice :1})
                }
            }
            //등뢱된 재배기 정보 저장
            setUserDeviceInfo({
                userInfo : data.data
            })
            //등록된 기기 정보 가져오기 성공
            setIsOk({
                isDevice : true
            });

        }).catch(e=>{
            console.log( e,"등록된 버섯 재배기 정보 가져오기 실패");
            
            //서버 통신 오류 확인
            setIsOk({
                isDevice : 1
            });
        })
    }
     
    //2번. 사용자가 선택한 재배기 id,재배기 name
    async function machine_id () {
         
        await axios.get(`${AWS_URL}${MACHINE_ID}`,{
            params: { token : (cookies.get('token')) }
        }).then(data => {
            //재배기 이름 추후 추가할 예정입니다.
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 ID 있음",parseInt(data.data.id))
            
            //사용자가 작동시킨 재배기 id, 재배기 이름 입력
            value.setIsOn({
                id : data.data.id,
                prgName : data.data.name
            })
            
        }).catch(e =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 ID 실패",e.response.status);
            setIsLoding(true) //선택한 재배기 없으면 로딩 끝내주기
            value.setIsOn({
                id : 17,
                prgName : "실험중입니다."
            })
        })


        HEADER_DEBUG && console.log("==============Myfarm 사용자가 선택한 재배기 확인end==============")
        
    }
    //3번 진행중인 프로그램 이름
    async function prg_name (){
        //재배개 작동 상태 가져오기 isValue
        await axios.get(`${AWS_URL}${PRG_NAME}`,{
            params :  {id : value.isOn.id }
        }).then(data =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 프로그램 이름 성공",data.data)
            value.setPrgInfo({
                prg_id : parseInt(data.data[0].id),
                prg_name : data.data[0].prg_name
            })
        }).catch(e =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 프로그램 이름 실패",e.response.status);
            value.setPrgInfo({
                prg_id : 5,
                prg_name : "선택한 재배기 프로그램 이름 가져오기 실패...."
            })
        })  

        HEADER_DEBUG && console.log("===========Myfarm end사용자가 선택한 재배기 작동 상태 확인===============")
    }


    //4번  버섯 재배기 안 모든 버섯 객체 정보 저장
    async function mushroom_all () {
        HEADER_DEBUG && console.log("==========4. Myfarm 모든 버섯 객체 저장하기==========")

    }
    //5.재배기 온도,습도 값 바꾸기
    async function maching_setting (temperature,humidity){
        setSetting(
            {temperature : temperature, humidity : humidity}
        )
    }
    //배지 이름 가져오기
    async function mushroom_name (){
        HEADER_DEBUG && console.log("==========6. Myfarm 배지 이름 가져오기==========")
        // axios.get()
    }

    //배지 이름 바꾸기
    async function mushroom_nameChange (){
        HEADER_DEBUG && console.log("==========6. Myfarm 배지 이름 바꾸기==========")
    }
    //프로그램 시작 날짜 가져오기
    async function start_date () {

       
        await axios.get(`${AWS_URL}${DATE}`,{
            params: {id : value.prgInfo.prg_id}
        }).then(data =>{
            console.log("프로그램 시작 날짜",data.data);
        }).catch(e=>{
            console.log("프로그램 시작 날짜 가져오기 실패",e.response.status,value.prgInfo);
        })

    }
    //번.재배기 작동 상태  isValue -> 제일 마지막에 실행 isLoding -> true 화면 보이기
    async function machine_status () {
        //재배개 작동 상태 가져오기 isValue
        await axios.get(`${AWS_URL}${MACHINE_STATUS}`,{
            params :  {id : value.isOn.id }
        }).then(data =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 작동 상태 성공",data.data)
            value.setIsValue(data.data)
            setIsLoding(true) //마지막 로딩 끝내주기
        }).catch(e =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 작동 상태 실패",e);
            
        })  

        HEADER_DEBUG && console.log("===========Myfarm end사용자가 선택한 재배기 작동 상태 확인===============")
    };
//////////////////////////////////////////////////////////////////////////////////////////////////////변수
    //myfarmInfo 
    const result = {
        // machine_list,machine_id,machine_status,setIsLoding
        machine_list,machine_id,machine_status,prg_name,mushroom_all,start_date
    }
    //MyfarmCss
    const result2 = {
        userDeviceInfo,setting,day
    }

    //한번만 실행하기
    useEffect(()=>{
        console.log("====================MyFarm 처음 실행 화면 ===================");
        // cookie상태값 확인하기
        DEBUG && console.log("MyFarm 토큰확인",cookies.get('token'));
        DEBUG && console.log("MyFarm userId 확인",cookies.get('userId'));
        DEBUG && console.log("MyFarm value 확인", value);
        DEBUG && console.log("MyFarm prgInfo 확인", value.prgInfo);
        DEBUG && console.log("MyFarm isCheck 확인", value.isCheck);
        //등록된 버섯 재배기 온도,습도 값 결정해 주기
        console.log("===================end===================="); //선택하면 값이 바뀜
        maching_setting(20,50)
    },[value.isCheck])
    useEffect(()=>{
        machine_list() //전체 파일 가져오기
    },[])
    

    useEffect(()=>{
        // machine_list()
        machine_id()
        prg_name()
        mushroom_all() //모든 객체 정보 가져오기
        start_date() //시작 날짜
        machine_status()

    },[machine_list])
    
    

    
    return (
        <>
        {
            cookies.get('token') ? (
                (
                    isOk.isDevice ? ( //재배기가 있나요? Yse
                        <MyfarmCss 
                            value={value} // 사용자 재배기id,name
                            isLoding={isLoding} //모든 사용 끝나면 보여주기
                            result2={result2} // 화면 보여줄 값 들
                            isOk={isOk.isDevice}
                        />
                    ):( //재배기 없어요
                        <>
                            <div className="LodingText">Loding....</div>
                            {/* <MyfarmInfo value={value} result={result}/> */}
                        </>
                    )
                )                
            ) : ( //로그인이 풀렸어요
                <Redirect to = "Login" />
            )
        }

        </>
        
    );
};

export default withCookies(MyFarm);
