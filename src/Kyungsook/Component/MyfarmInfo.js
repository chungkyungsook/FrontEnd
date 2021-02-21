import axios from 'axios';
import React,{useState,useEffect} from 'react' ;

import { withCookies } from 'react-cookie';
import {format} from 'date-fns';

import {
    AWS_URL,
    DATE,
    MUSHROOM_TYPE,
    MUSHROOM_ALL,
    MACHINE_DATA
} from '../../Util/api.js'

import {
    DEBUG
} from '../../Util/debugging'
const MyfarmInfo = ({value,cookies,day,setDay})=>{
   
//////////////////////////////////////////////////////////////// 변수
var data = new Date();
//자라는 중 , 수확완료, 백화고, 수확
const type = ['growing','complete','whiteflower','harvest']
const {kinokoNumber, kinokosList } = value.kinokoInfo;
// mr_date : 자란 날짜

//////////////////////////////////////////////////////////////// 함수
//////////////////////////////////////////////////////////////// 생명주기

    useEffect(()=>{
        console.log('=======================MyfarmInfo 처음 시작합니다====================');
        console.log('value', value);
        
        value.setKinokoInfo({
            kinokosList : null,
            kinokoNumber : {
                thisKinoko: [],
                getKinoko : [],
                endKinoko : [],
                witeKinoko : [], //백화고 상태
                growingKinoko:[]
            } 
        })

    },[])


    useEffect(()=>{
        console.log("=================MyfarmInfo===================="); //선택하면 값이 바뀜
        // cookie상태값 확인하기
        console.log("MyFarmInfo ", value)

        value.isOn.id !== 0 && (
           axios.get(`${AWS_URL}${DATE}`,{
                params: { id : value.isOn.id }
            }).then(data =>{
                DEBUG && console.log("MyfarmInfo 프로그램 일차",data.data)
                // setDay({
                //     ...day,
                //     kinokoDay : data.data
                // })
                setDay({
                    today : format(new Date, "yyyy-MM-dd h"),
                    kinokoDay :format( new Date(data.data), 'yyyy-MM-dd')
                })
            }).catch(e=>{
                DEBUG && console.log("MyfarmInfo 프로그램 일차 err",e.response.status)
                setDay({
                    today : "재배기를 작동시켜주세요",
                    kinokoDay : "저장된 날짜가 없습니다."
                })

            })
        )

        //진행중인 프로그램 이름
        value.isOn.id !== 0 && (
            axios.get(`${AWS_URL}${MACHINE_DATA}`,{
                params: { id : value.isOn.id }
            }).then(data =>{
                DEBUG && console.log("MyfarmInfo 프로그램 ID,NAME",data.data)
                value.setPrgInfo({
                    prg_id: data.data[0].id,
                    name : data.data[0].prg_name
                })
                axios.get(`${AWS_URL}${MUSHROOM_ALL}`,{
                    params: {prgId : data.data[0].id }
                }).then(data =>{
                    DEBUG && console.log("MyfarmInfo 버섯 상태 가져오기",data.data.length)
                    value.setKinokoInfo({
                        ...value.kinokoInfo,
                        kinokosList: data.data
                    })
                }).catch(e=>{
                    DEBUG && console.log("MyfarmInfo 버섯 상태 errroeeor",e.response.status)
                })

            }).catch(e=>{
                DEBUG && console.log("MyfarmInfo 프로그램 ID,NAME err",e.response.status)
                value.setPrgInfo({
                    prg_id: "",
                    name : "실행중인 프로그램이 없습니다."
                })
            })
        )
        
        console.log("===================end===================="); //선택하면 값이 바뀜
    },[value.isOn.id])
   
    useEffect(()=>{
        console.log("===================myfarminfo date===================="); //선택하면 값이 바뀜
        console.log(day.today)
        console.log(day.kinokoDay)

        console.log((day.today - day.kinokoDay / (1000*60*60*24) ),'일');
        
    },[day.kinokoDay])

    useEffect(()=>{
        console.log("=============myfarminfo 버섯 상태=============");
        console.log("버섯 값 있는지 확인",value.kinokoInfo)
        //초기화
        !value.isValue && (
            value.setKinokoInfo({
                kinokosList : null,
                kinokoNumber : {
                    thisKinoko: [],
                    getKinoko : [],
                    endKinoko : [],
                    witeKinoko : [], //백화고 상태
                    growingKinoko:[]
                } 
            })
        )

        kinokosList !== null && value.isValue && (
            
            //자라는 중 , 수확완료, 백화고, 수확
            //  ['growing','complete','whiteflower','harvest']
            kinokosList.map((data,index)=>(
                console.log(data),
                pushKinoko(data)
            ))
              
              
        
        )
        console.log("=============end=============");
    },[value.kinokoInfo.kinokosList])

    const pushKinoko = (data) =>{        
        format(new Date, "yyyy-MM-dd") === format(new Date(data.mr_date), "yyyy-MM-dd") &&  (
            value.setKinokoInfo({
                ...value.kinokoInfo,
                kinokoNumber :{
                    ...kinokoNumber, 
                    kinokoNumber: {...kinokoNumber, thisKinoko : kinokoNumber.thisKinoko++}
                }
            })
        )
        // ,
        data.mr_status === type[0] ? (
            value.setKinokoInfo({
                ...value.kinokoInfo,
                kinokoNumber :{
                    ...kinokoNumber, 
                    kinokoNumber: {...kinokoNumber, growingKinoko : kinokoNumber.growingKinoko++}
                }
            })
        )
        : data.mr_status === type[1] ? (
            value.setKinokoInfo({
                kinokosList : kinokosList,
                kinokoNumber: {...kinokoNumber, endKinoko : kinokoNumber.endKinoko++}
            })
        )
        :data.mr_status === type[2] ? (
            value.setKinokoInfo({
                kinokosList : kinokosList,
                kinokoNumber: {...kinokoNumber, witeKinoko : kinokoNumber.witeKinoko++}
            })
        )
        :data.mr_status === type[3] ? (
            value.setKinokoInfo({
                ...value.kinokoInfo,
                kinokoNumber: {...kinokoNumber, getKinoko : kinokoNumber.getKinoko++}
            })
        )
        :console.log("no")
    }

////////////////////////////////////////////////////////////////
    return(
        <>
        <div></div>
        </>
    )
}

export default MyfarmInfo;
// export default withCookies(MyfarmInfo);