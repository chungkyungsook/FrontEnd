import React, { useEffect, useState } from 'react' ;
import styled from 'styled-components' ;
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import KinokoInfo from '../Component/FarmComponent/KinokoInfo';
import FarmMock from '../Component/FarmComponent/FarmMock'
import axios from 'axios';

const Farm = (props) => {
  
  const id = 7
  const url = '54.210.105.132'

  //모든 버섯 정보 저장
  const [imgList, setImgList] = useState({
    kinokosList : null,
    kinokoNumber : {
      allKinoko : null,
      thisKinoko: null,
      getKinoko : null,
      endKinoko :null
    }
  })

  //선택한 버섯 정보 저장
  const [kinoko,setKinoko] = useState(null)
 
  //전체 객체 가져오기
  const getList = ()=>{
    const url = "dummy/MyFarm.json";

    axios.get(url).then(data =>{
      console.log("Farm axios getList()");
      setImgList({...imgList, kinokosList : data.data.kinokoImg})
    }).catch( e =>{
      
    })
  }

  const onClick = (data) =>{
    console.log("Farm 버섯 객체 누르면 해당 정보 보여주기",data);
    setKinoko(data)
  }

  useEffect(()=>{
    console.log('===========Farm 처음 실행 상태===========');
  },[])

  
  useEffect(()=>{
    console.log("==============디버그=============");
    console.log('Farm imge', imgList);
    console.log('Farm kinoko', kinoko);
    console.log("==============end==============");

    imgList.kinokosList && (
      imgList.kinokosList.map((data,index)=>(
          console.log(data)        
      ))
    )
    // imgList.kinokosList !== null
  },[imgList,kinoko])

  return(
      <>
        {/* 선택한 기기 버섯 정보 가져오기 */}
        <KinokoInfo getList={getList} imgList ={imgList}/>
        {/* 버섯 저오 화면에 보이기 */}
        <FarmMock imgList={imgList} kinoko={kinoko} onClick={onClick}/>
      </>
  )  
} 

export default withCookies(Farm) ;