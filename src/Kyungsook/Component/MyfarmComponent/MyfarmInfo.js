import axios from 'axios';
import React,{useState,useEffect} from 'react' ;

import { withCookies } from 'react-cookie';
import {format} from 'date-fns';

import {
    AWS_URL,
    MACHINE_LIST, //재배기 목록
    PRG_NAME, // 프로그램 이름,id
    MUSHROOM_ALL, //모든 버섯 상태 가져오기
    DATE, //재배기 실행 날짜
    MACHINE_ID, //재배기 id가져오기 
    MACHINE_STATUS //재배기 상태 가졍괴
} from '../../../Util/api.js'




const MyfarmInfo = ({result, value : { isOn, prgInfo, isCheck, setIsCheck },cookies})=>{ //machine_list,machine_id,prg_name,machine_status

    useEffect(()=>{
        console.log('====================MyfarmInfo 처음 실행 화면====================',isOn,prgInfo);
        result.machine_list() //전체 파일 가져오기
        result.machine_id()
        result.prg_name()
        result.mushroom_all() //모든 객체 정보 가져오기
        result.start_date() //시작 날짜
        result.machine_status()
            
    },[isOn, prgInfo, isCheck]) 

    useEffect(()=>{
        console.log('isChecck', isCheck);

    },[isCheck, setIsCheck])

    return(
        <div>
     
        </div>
    )

}

export default withCookies(MyfarmInfo);
   