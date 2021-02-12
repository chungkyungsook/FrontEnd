import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { withCookies } from 'react-cookie';
import FarmMock from './FarmMock';
import FarmBox from './FarmBox';

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

    //버섯 정보 담을 틀
    const [mushrooms, setMushrooms] = useState([])
    //선택한 기기 
    const [prgId, setPrgId] = useState('')
    const id = 7
    //url
    // const url = '172.26.3.62'
    const url = '54.210.105.132'
    const test =  props.cookies.get('deviceNumber') && props.cookies.get('deviceNumber') 

    // useEffect(()=>{
    //   console.log(" ============================ 여기서 부터 Farm KinokoInfo ============================");
    //     test === "" ? console.log("공백") : console.log("공백아님",test)
    //     console.log("KinokoInfo farm 화면전환");
    //     console.log("KinokoInfo farm 쿠키(선택한 기기,deviceNumber) 확인 ", test && test.machine_prgid);

    //     axios.get(`http://${url}/api/mushroom`,{
            
    //     //   params:{prgId : test.machine_prgid}
    //       params:{prgId : 6}
      
    //     }).then((data) =>{
    //         setMushrooms(mushrooms.concat(data.data))
    //     }).catch(e=>{
    //       console.log(e)
    //     })
    
    //   },[])
      
    //   const [value, setValue] = useState('')
    //   const onClick = (data)=>{
    //     console.log(data)
    //     setValue(data)
    //   }


    // 서버와 통신 X 
    const day = ['mon','tue','wed'] //버섯의 객체
    const [imgList, setImgList] = useState({
      kinokosList : [],
      chooesKinoko : []
    })
  
    //전체 객체 가져오기
    const getList = ()=>{
      const url = "dummy/MyFarm.json";

      axios.get(url).then(data =>{
        setImgList({...imgList, kinokosList : data.data.kinokoImg})
      }).catch( e =>{
        
      })
    }

    const onClick = (data) =>{
      console.log("data",data);

      setImgList({
        ...imgList,
        chooesKinoko : imgList.kinokosList.filter(list => list.day === data )
      })
      imgList.kinokosList.filter(list => list.day === data && console.log(list))
      // imgList.kinokosList.map(list => console.log('filter',list))
  }

    useEffect(()=>{
      getList()
    },[])

    useEffect(()=>{
      console.log('imge', imgList);
    },[imgList])

    return(
        <>
            {/* <FarmBox onClick={onClick} mushrooms={mushrooms} value={value}/> */}
            <FarmMock onClick = {onClick} imgList={imgList}/>
        </>
    )

}


export default withCookies(KinokoInfo);