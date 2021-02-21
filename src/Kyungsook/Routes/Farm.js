import React, { useEffect, useState } from 'react' ;
import { withCookies} from 'react-cookie';
import KinokoInfo from '../Component/FarmComponent/KinokoInfo';
import FarmMock from '../Component/FarmComponent/FarmMock'
import axios from 'axios';

import {
  AWS_URL,
  MUSHROOM_ALL,
  MACHINE_DATA
} from '../../Util/api'

import {
  DEBUG
} from '../../Util/debugging'
const Farm = (props) => {
  const {value} = props
  const {prgInfo} = props.value

  //모든 버섯 정보 저장
  const [imgList, setImgList] = useState({
    kinokosList : null,
    kinokoNumber : {
      allKinoko : 0,
      thisKinoko: 0,
      getKinoko : 0,
      endKinoko : 0
    }
  })
  const {kinokoNumber} = imgList
  //선택한 버섯 정보 저장
  const [kinoko,setKinoko] = useState(null)
 
  //전체 객체 가져오기
  const getList = ()=>{

    axios.get(`${AWS_URL}${MUSHROOM_ALL}`,{
      params: {prgId :  prgInfo.prg_id}
    }).then(data =>{
      console.log("Farm axios getList()");
      setImgList({...imgList, kinokosList : data.data})
    }).catch( e =>{
      
    })
  }

  const onClick = (data) =>{
    console.log("Farm 버섯 객체 누르면 해당 정보 보여주기",data);
    // setKinoko(data)
  }

  useEffect(()=>{
    console.log('===========Farm 처음 실행 상태===========');
   
  },[])

  //버섯 상태별로 저장하기
  
  useEffect(()=>{
    console.log("==============farm 디버그=============");
    console.log('Farm imge', imgList);
    console.log('Farm kinoko', kinoko);
    
    imgList.kinokosList && (
        imgList.kinokosList.map((data,index)=>(
        numUp(data.mr_status)
      ))
    )
    //
    imgList.kinokosList &&( setImgList({...imgList, kinokoNumber: {...kinokoNumber, allKinoko : imgList.kinokosList.length}}))
    

    console.log("==============end==============");
    // imgList.kinokosList !== null
  },[imgList.kinokosList])

  const numUp = (data) =>{
    
        data === 'growing' ? (
          setImgList({...imgList, kinokoNumber: {...kinokoNumber, thisKinoko : kinokoNumber.thisKinoko++}})
        ) 
        : data === 'harvest' ? (
          setImgList({...imgList, kinokoNumber: {...kinokoNumber, getKinoko : kinokoNumber.getKinoko++}})
        )
        : data === 'complete' ?(
          setImgList({...imgList, kinokoNumber: {...kinokoNumber, endKinoko : kinokoNumber.endKinoko++}})
        )
        : data === 'whiteflower' ?(
          setImgList({...imgList, kinokoNumber: {...kinokoNumber, getKinoko : kinokoNumber.getKinoko++}})
        )
        : (console.log('NO'))
    
  }
  return(
      <>
        {/* 선택한 기기 버섯 정보 가져오기 */}
        <KinokoInfo value={value} getList={getList} imgList ={imgList}/>
        {/* 버섯 화면에 보이기 -> mock은 test파일 원본은 farmBox */}
        <FarmMock imgList={imgList} kinoko={kinoko} onClick={onClick}/>
      </>
  )  
} 

export default withCookies(Farm) ;