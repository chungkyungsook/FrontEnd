import React, { useEffect, useState } from 'react' ;
import styled from 'styled-components' ;
import {Redirect}   from 'react-router-dom' ;
import { withCookies} from 'react-cookie';
import KinokoInfo from '../Component/FarmComponent/KinokoInfo';
import FarmMock from '../Component/FarmComponent/FarmMock'
import axios from 'axios';

import {
  AWS_URL,
  MUSHROOM_ALL, //모든 버섯 상태 가져오기
  
} from '../../Util/api.js'
const Farm = ({cookies,value}) => {
  
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

      
  const [growing, setGrowing] = useState([])
  const [harvest, setHarvest] = useState([])
  const [whiteflower, setWhiteflower] = useState([])
  const [complete, setComplete] = useState([])

  const kinokoState = ['growing', 'harvest', 'whiteflower', 'complete']
  
  const veiew = {
    growing, harvest, whiteflower, complete
  }
    //4번  버섯 재배기 안 모든 버섯 객체 정보 저장
  //   const mushroom_all = ()=> {
  //     console.log("==========4. Myfarm 모든 버섯 객체 저장하기==========")
  //     let temp = []
  //     axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[0]}`,{
  //         params : {prgId : value.prgInfo.prg_id}
  //     }).then(data =>{               
  //         console.log(data.data);
  //         setGrowing(  
  //             data.data
  //         )
  //     }).catch(e =>{
  //         console.log("모든 버섯 정보 가져오기 실패",e);
  //     })

  //     axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[1]}`,{
  //         params : {prgId : value.prgInfo.prg_id}
  //     }).then(data =>{               
  //         console.log(data.data);
  //         setHarvest(  
  //               data.data
  //         )
  //     }).catch(e =>{
  //         console.log("모든 버섯 정보 가져오기 실패",e);
  //     })

  //     axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[2]}`,{
  //         params : {prgId : value.prgInfo.prg_id}
  //     }).then(data =>{               
  //         console.log(data.data);
  //         setWhiteflower(  
  //               data.data
  //         )
  //     }).catch(e =>{
  //         console.log("모든 버섯 정보 가져오기 실패",e);
  //     })

  //     axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[3]}`,{
  //       params : {prgId : value.prgInfo.prg_id}
  //     }).then(data =>{               
  //         console.log(data.data);
  //         setComplete(  
  //               data.data
  //         )
  //     }).catch(e =>{
  //         console.log("모든 버섯 정보 가져오기 실패",e);
  //     })
  // }

  const mushroom_all = () =>{
      
      axios.get(`${AWS_URL}${MUSHROOM_ALL}`,{
        params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log("ddddd",data.data);
      }).catch(e =>{
          console.log("모든 버섯 정보 가져오기 실패",e);
      })
  }

  const onClick = (data) =>{
    console.log("Farm 버섯 객체 누르면 해당 정보 보여주기",data);
    setKinoko(data)
  }

  useEffect(()=>{
    console.log('===========Farm 처음 실행 상태===========');
    // mushroom_all()
    // console.log(value.prgInfo.prg_id);
  },[value.prgInfo.prg_id])

  //버섯 상태별로 저장하기
  
    
  return(
      <>
        {/* 선택한 기기 버섯 정보 가져오기 */}
        <KinokoInfo mushroom_all={mushroom_all} imgList ={imgList}/>
        {/* 버섯 화면에 보이기 -> mock은 test파일 원본은 farmBox */}
        <FarmMock imgList={imgList} kinoko={kinoko} onClick={onClick}/>
      </>
  )  
} 

export default withCookies(Farm) ;