import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { withCookies } from 'react-cookie';


const KinokoInfo = (props)=>{

    
    useEffect(()=>{
      console.log('===========Farm KinokoInfo 처음 실행 상태===========');
      
    },[])

    return(
        <>
        </>
    )

}


export default withCookies(KinokoInfo);