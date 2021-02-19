import React,{useState,useEffect} from 'react' ;

import { withCookies } from 'react-cookie';

const MyfarmInfo = ({value,cookies})=>{
//////////////////////////////////////////////////////////////// 변수
//////////////////////////////////////////////////////////////// 함수
//////////////////////////////////////////////////////////////// 생명주기
    useEffect(()=>{
        console.log('=======================MyfarmInfo====================');
        console.log('value', value);
    },[])


    useEffect(()=>{
        console.log("=================MyfarmInfo===================="); //선택하면 값이 바뀜
        // cookie상태값 확인하기
        console.log("MyFarmInfo ", value.isOn)
        
        console.log("===================end===================="); //선택하면 값이 바뀜
    },[value.isOn.prgName])

   
////////////////////////////////////////////////////////////////
    return(
        <div></div>
    )
}

export default MyfarmInfo;
// export default withCookies(MyfarmInfo);