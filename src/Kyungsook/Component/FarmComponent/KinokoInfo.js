import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { withCookies } from 'react-cookie';

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

   const {getList} = props;
    //url
    
    useEffect(()=>{
      console.log('===========Farm KinokoInfo 처음 실행 상태===========');
      getList()
    },[])

    return(
        <>
        </>
    )

}


export default withCookies(KinokoInfo);