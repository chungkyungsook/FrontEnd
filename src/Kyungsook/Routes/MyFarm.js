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
    MUSHROOM_NAME, //버섯 배지이름 가져오기
    MUSHROOM_NAME_CHANGE, //버섯 배지이름 변경
    COMPOST
} from '../../Util/api.js'

import {
    DEBUG,
    HEADER_DEBUG
} from '../../Util/debugging.js'

import MyfarmInfo from '../Component/MyfarmComponent/MyfarmInfo'; //정보 값 가져오기
import MyfarmCss from '../Component/MyfarmComponent/MyfarmCss';   // 해당 페이지 보여주기

import {format} from 'date-fns';
import { da } from 'date-fns/locale';
import { concat } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import io from 'socket.io-client'
const MyFarm = ({cookies,value,logoutOnClick,location}) => {
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
    //일차 
    const [days, setDays] = useState('')

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
    const [isLoding, setIsLoding]         = useState(false)

    //버섯 배지 이름 저장
    const [kinokoName, setKinokoName]     = useState('')
    
    //버섯 이름 바꾸는 버튼 바꾸기 false면 -> 기존 이름 바꾸기, true -> 해당 버섯 배지이름 없음
    const [isNameChange, setIsNameChange] = useState(false)

    //배지 이름 변경을 위한 변수들
    const [mushroomName, setMushroomName] = useState('')

    //버섯 객체 저장하기
    
    const [growing, setGrowing]         = useState([])
    const [harvest, setHarvest]         = useState([])
    const [whiteflower, setWhiteflower] = useState([])
    const [video, setVideo]           = useState()

    const kinokoState = ['growing', 'harvest', 'whiteflower']
    const temp = {
        setGrowing,
        setHarvest,
        setWhiteflower,
        setIsLoding
    }
    //MyfarmCss
    const result2 = {
        userDeviceInfo,setting,day,days,kinokoName,isNameChange,growing,harvest,whiteflower
    }
///////////////////////////////////////////////////////////////////////    실행 함수
    
    // 1번. user에 등록 된 기기 정보 가져오기
    function machine_list () {

        //user에 등록 된 기기 정보 가져오기
        axios.post(`${AWS_URL}${MACHINE_LIST}`,{
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
            // setUserDeviceInfo([])            
        
            //서버 통신 오류 확인
            setIsOk({
                isDevice : 1
            });
        })
    }
     
    //2번. 사용자가 선택한 재배기 id,재배기 name
    function machine_id () {
         
        axios.get(`${AWS_URL}${MACHINE_ID}`,{
            params: { token : (cookies.get('token')) }
        }).then(data => {
            //재배기 이름 추후 추가할 예정입니다.
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 ID 있음",parseInt(data.data.id))
            
            //사용자가 작동시킨 재배기 id, 재배기 이름 입력
            value.setIsOn({
                id : JSON.stringify(data.data.id),
                prgName : data.data.name
            })
            
        }).catch(e =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 ID 실패",e.response.status);
            setIsLoding(true) //선택한 재배기 없으면 로딩 끝내주기
            value.setIsOn({
                id : 0,
                prgName : ""
            })
        })


        HEADER_DEBUG && console.log("==============Myfarm 사용자가 선택한 재배기 확인end==============")
        
    }
    //3번 진행중인 프로그램 이름 -> 진행중인 프로그램이 없으면 모든 값들 초기화 시켜주기
    function prg_name (){
        //재배개 작동 상태 가져오기 isValue
        axios.get(`${AWS_URL}${PRG_NAME}`,{
            params :  {id : value.isOn.id }
        }).then(data =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 프로그램 이름 성공",data.data)
            value.setPrgInfo({
                prg_id : data.data[0].id,
                prg_name : data.data[0].prg_name
            })
        }).catch(e =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 프로그램 이름 실패",e.response.status);
            //값 초기화 해주기
            setIsLoding(true)
            setDays(0)
            setKinokoName('') //키노코 이름
            setGrowing([]) //버섯 상태
            setHarvest([]) // 수확해야하는 버섯
            setWhiteflower([]) //백화고
            setIsNameChange(false)
            value.setPrgInfo({
                prg_id : 0,
                prg_name : "진행중인 프로그램이 없습니다."
            })

        })  

        HEADER_DEBUG && console.log("===========Myfarm end사용자가 선택한 재배기 작동 상태 확인===============")
    }

    //4번  버섯 재배기 안 모든 버섯 객체 정보 저장
    function mushroom_all () {
        HEADER_DEBUG && console.log("==========4. Myfarm 모든 버섯 객체 저장하기==========")
        let temp = []
        axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[0]}`,{
            params : {prgId : value.prgInfo.prg_id}
        }).then(data =>{               
            console.log(data.data);
            setGrowing(  
                data.data
            )
        }).catch(e =>{
            console.log("모든 버섯 정보 가져오기 실패",e);
        })

        axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[1]}`,{
            params : {prgId : value.prgInfo.prg_id}
        }).then(data =>{               
            console.log(data.data);
            setHarvest(  
                 data.data
            )
        }).catch(e =>{
            console.log("모든 버섯 정보 가져오기 실패",e);
        })

        axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[2]}`,{
            params : {prgId : value.prgInfo.prg_id}
        }).then(data =>{               
            console.log(data.data);
            setWhiteflower(  
                  data.data
            )
        }).catch(e =>{
            console.log("모든 버섯 정보 가져오기 실패",e);
        }).finally(e=>{
            value.prgInfo.prg_id !== 0 && 
            setIsLoding(true)
        })

        
    }

    //5.재배기 온도,습도 값 바꾸기
    function maching_setting (temperature,humidity){

        setSetting(
            {temperature : temperature, humidity : humidity}
        )
    }

    //영상 처리하기
    function video_view(res_video){

    }

    //버섯 배지 이름 가져오기
    function mushroom_name (){
        HEADER_DEBUG && console.log("==========6. Myfarm 배지 이름 가져오기==========")
        axios.get(`${AWS_URL}${MUSHROOM_NAME}`,{
            params : {id : parseInt(value.prgInfo.prg_id)}
        }).then(data =>{
            console.log("이름 가져오기 성공",data.data)
            setKinokoName(data.data)
            setIsNameChange(true)
        }).catch(e =>{
            console.log(e);
        })
        
    }

    //프로그램 시작 날짜 가져오기
    function start_date () {

        axios.get(`${AWS_URL}${DATE}`,{
            params: {id : value.prgInfo.prg_id}
        }).then(data =>{
            console.log("프로그램 시작 날짜",data.data)
            setDay({
                today : format(new Date, "yyyy-MM-dd"),
                kinokoDay : format(new Date(data.data), "yyyy-MM-dd")
            })
        }).catch(e=>{
            console.log("프로그램 시작 날짜 가져오기 실패",e.response.status,value.prgInfo);
        })

    }

    //배지이름 바꾸기 위한 이벤트
    const onChange = (e) =>{
        const {value} = e.target
        setMushroomName(value) //배지 이름 입력한 정보 저장
    }

    //배지 이름 바꾸기
    function onClickChangeName (e){
        const {name} = e.target
        
        if(name === "name"){
            console.log("버튼이 클릭 됨",name);
            setIsNameChange(false)
        }else if(name === "changeName"){ // 이름 바꾸기
            console.log("버튼이 클릭 됨",name);
                if(value.prgInfo.prg_id !== 0){
                    axios.put(`${AWS_URL}${MUSHROOM_NAME_CHANGE}`,{
                    
                        id : parseInt(value.prgInfo.prg_id),
                        name : mushroomName
                    
                }).then(data=>{
                    console.log("myfarm 배지 이름 바꾸기 성공",data);
                    mushroom_name()
                }).catch(e =>{
                    console.log("myfarm 배지 이름 바꾸기 실패");
                }).finally(
                    setIsNameChange(true) //버튼 값 바꿔주기
                )
            }
        }
    }

    //마지막. 재배기 작동 상태  isValue -> 제일 마지막에 실행 isLoding -> true 화면 보이기
     function machine_status () {
        //재배개 작동 상태 가져오기 isValue
         axios.get(`${AWS_URL}${MACHINE_STATUS}`,{
            params :  {id : value.isOn.id }
        }).then(data =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 작동 상태 성공",data.data)
            value.setIsValue(data.data)
            // setIsLoding(true) //마지막 로딩 끝내주기
        }).catch(e =>{
            HEADER_DEBUG && console.log("Myfarm 사용자가 선택한 재배기 작동 상태 실패",e);
            
        })  

        HEADER_DEBUG && console.log("===========Myfarm end사용자가 선택한 재배기 작동 상태 확인===============")
    };    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////변수

///////////////////////////////////////////////////////////////////////////////////////////////////////// useEffect

    // useEffect(() => {
    
    //     // 소켓 연결 코드
    //     const socket = io('http://192.168.0.10:3000') ;
    
    //     // console.log(io) ;
    //     //실사간 이미지 가져오기
    //     // socket.emit('req_video', true) ;
    //     // socket.on('res_video', (data) => {
    //     //   console.log(data) ;
           //   video_view(data)
    //     // }) ;
    
    //     // 온, 습도 데이터 요청
    //     socket.emit('req_cosdata');
    //     // 온, 습도 데이터 받아오는 이벤트
    //     socket.on('res_cosdata', (data) => {
    //             console.log(data);
    //             maching_setting(parseInt(data.temperature), parseInt(data.humidity) ,) //재배기 온도 습도 작동 환경
    //     });

    //     return () => {
    //       socket.disconnect() ;
    //     }
        
    //   }, []) ;
    
    //화면에 보여줄 모든 버섯, 재비기 , 재배기 상태 가져오기
    useEffect(()=>{
        setIsLoding(false)
        console.log("리스트 실행 isCheck",value.isCheck);
        machine_list()
        machine_id()
    },[value.isCheck])

    useEffect(()=>{ //리스트에 값이 있으면 실행하기
        console.log("리스트 다음 실행 ",value.isOn.id,);
        console.log("myfarm list prgInfo, isdevice",value.prgInfo,isOk.isDevice);
        if(isOk.isDevice){
            prg_name()
            machine_status()
        }
        
    },[isOk.isDevice,value.isOn.id])

    //한번만 실행하기
    useEffect(()=>{
        console.log("====================MyFarm 처음 실행 화면 ===================");
        // cookie상태값 확인하기
        DEBUG && console.log("MyFarm prgInfo 확인", value.prgInfo);
        DEBUG && console.log("MyFarm isCheck 확인", value.isCheck);
        //등록된 버섯 재배기 온도,습도 값 결정해 주기
        console.log("===================end===================="); //선택하면 값이 바뀜
        //진행중인 프로그램 이름이 있으면
        if(value.prgInfo.prg_id !== 0){ 
            start_date() //시작 날짜
            mushroom_name() // 버섯 배지 이름 가져오기    
            mushroom_all()
            
        }
        else if(value.prgInfo.prg_id === 0){ //진행중인 프로그램 없으면 모든 값 초기화 해주기
            console.log(value.prgInfo.prg_id,"ddddddd");
            setDays(0)
            setKinokoName('')
            setGrowing([])
            setHarvest([])
            setWhiteflower([])
        }
        
    },[value.prgInfo.prg_id,value.isCheck])


    
    useEffect(()=>{ //날짜 계산해서 일차 구하기
        // console.log("오늘은 며칠?",day.today, day.kinokoDay);
        if(result2.day.today !== '' ){
        
        let test = new Date(day.today)
        let test2 = new Date(day.kinokoDay)
        setDays((test.getTime() - test2.getTime()) / (1000*60*60*24))
        
        } 
        
    },[day])   
    //끝 화면에 보여줄 모든 버섯, 재비기 , 재배기 상태 가져오기 
    useEffect(()=>{
        (console.log("==================MyFarmCss 처음 실행 화면 =================="));
        console.log("값이 바뀜",result2.kinokoName);
        
    },[result2.kinokoName])
    
    return (
        <>
        {
            cookies.get('token') ? (
                <MyfarmCss 
                    value={value} // 사용자 재배기id,name
                    isLoding={isLoding} //모든 사용 끝나면 보여주기
                    result2={result2} // 화면 보여줄 값 들
                    isOk={isOk.isDevice}
                    onClickChangeName={onClickChangeName} //이름 바꾸기
                    onChange={onChange}
                    temp= {temp}
                />
            ) : ( //로그인이 풀렸어요
                <Redirect to = "Login" />
            )
        }

        </>
        
    );
};

export default withCookies(MyFarm);