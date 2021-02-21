import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { withCookies } from 'react-cookie';

import {
  AWS_URL,
  MUSHROOM_ALL,
  MACHINE_DATA
} from '../../../Util/api'

import {
  DEBUG
} from '../../../Util/debugging'
/**
 * This component is for Information. 
 * Farm 컴포넌트
 * @param {{
 *      cookies: {{
 *                 get(): DODOSADFOIADJFOEIWFEOWFIJJIO
 *                  }}
 * }} props 
 */
const KinokoInfo = (props)=>{

   const {getList,value} = props;
    //url
    
    useEffect(()=>{
      console.log('===========Farm KinokoInfo 처음 실행 상태===========',value.isOn.id);
       //진행중인 프로그램 이름
       getList()
      console.log("===================end===================="); //선택하면 값이 바뀜
    },[])

    return(
        <>
        </>
    )

}


export default withCookies(KinokoInfo);