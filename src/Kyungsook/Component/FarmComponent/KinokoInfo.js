import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { withCookies } from 'react-cookie';
import FarmBox from './FarmBox';

/**
 * This component is for Information.
 * @param {{
 *      cookies: {{
 *                 get(): DODOSADFOIADJFOEIWFEOWFIJJIO
 *                  }}
 * }} props 
 */
const KinokoInfo = (props)=>{

    //버섯 정보 담을 틀
    const [mushrooms, setMushrooms] = useState([])
    //선택한 기기 
    const [prgId, setPrgId] = useState('')
    const id = 7
    //url
    const url = '172.26.3.62'
    const test =  props.cookies.get('deviceNumber') && props.cookies.get('deviceNumber') 

    useEffect(()=>{
        test === "" ? console.log("공백") : console.log("공백아님",test)
        console.log("KinokoInfo farm 화면전환");
        console.log("KinokoInfo farm 쿠키 확인", test && test.machine_prgid);

        axios.get(`http://${url}/api/mushroom`,{
            
        //   params:{prgId : test.machine_prgid}
          params:{prgId : 6}
      
        }).then((data) =>{
            setMushrooms(mushrooms.concat(data.data))
        }).catch(e=>{
          console.log(e)
        })
    
      },[])
      
      const [value, setValue] = useState('')
      const onClick = (data)=>{
        console.log(data)
        setValue(data)
      }

    return(
        <>
            <FarmBox onClick={onClick} mushrooms={mushrooms} value={value}/>
        </>
    )

}


export default withCookies(KinokoInfo);