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
  MACHINE_ID,
  PRG_NAME,
  MACHINE_STATUS
} from '../../Util/api.js'
import { tr } from 'date-fns/locale';
const Farm = ({cookies,value}) => {
  

  //선택한 버섯 정보 저장
  const [kinoko,setKinoko] = useState(null)

  //버섯 객체 정보 담기
  const [growing, setGrowing] = useState([])
  const [harvest, setHarvest] = useState([])
  const [whiteflower, setWhiteflower] = useState([])
  const [complete, setComplete] = useState([])
  const [kinokoList, setKinokoList] = useState(null)

  //로딩 화면 대기
  const [loding, setLoding] = useState(false)

  //버섯 상태별
  const kinokoState = ['growing', 'harvest', 'whiteflower', 'complete']

  //버섯 선택 유무 판단
  const [name, setName] = useState(null)
  const kinokoOnClick = (e) =>{
    console.log(e.target.id)
    setName(e.target.id)
  }

  const onClick = (data) =>{
    console.log("Farm 버섯 객체 누르면 해당 정보 보여주기",data);
    setKinoko(data)
  }

    //4번  버섯 재배기 안 모든 버섯 객체 정보 저장
    function mushroom_all () {
      console.log("==========4. Myfarm 모든 버섯 객체 저장하기==========")
      
      axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[0]}`,{
          params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setGrowing(  
              data.data
          )
      }).catch(e =>{
          console.log("자라고 있는 버섯 정보 가져오기 실패",e);
      })

      axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[1]}`,{
          params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setHarvest(  
                data.data
          )
      }).catch(e =>{
          console.log("수확 버섯 정보 가져오기 실패",e);
      })

      axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[2]}`,{
          params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setWhiteflower(  
                data.data
          )
      }).catch(e =>{
          console.log("백화고 버섯 정보 가져오기 실패",e);
      })

      axios.get(`${AWS_URL}${MUSHROOM_ALL}/${kinokoState[3]}`,{
        params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setComplete(  
                data.data
          )
      }).catch(e =>{
          console.log("수확한 버섯 정보 가져오기 실패",e);
      })

      axios.get(`${AWS_URL}${MUSHROOM_ALL}`,{
        params : {prgId : value.prgInfo.prg_id}
      }).then(data =>{               
          console.log(data.data);
          setKinokoList(  
                data.data
          )

          setLoding(true)
      }).catch(e =>{
          console.log("수확한 버섯 정보 가져오기 실패",e);
          alert('아직 정보가 없어요..')
          setLoding(1) // 해당 데이터가 없으면 myfarm페이지로 이동
      })

    }
    //마지막. 재배기 작동 상태  isValue -> 제일 마지막에 실행 isLoding -> true 화면 보이기    
  useEffect(()=>{
    console.log('===========Farm 처음 실행 상태===========');
    console.log('===========end===========');
    // mushroom_all()
  },[])

  useEffect(()=>{
    
    console.log('kinokoList',kinokoList);
    console.log('kinokoList',growing);
    console.log('kinokoList',harvest);
    console.log('kinokoList',whiteflower);
    console.log('kinokoList',complete);
    
  },[kinokoList])

  useEffect(()=>{
    console.log('===========Farm 처음 실행 상태===========');
    value.prgInfo.prg_id !== 0 &&  mushroom_all()
  },[value.prgInfo])
  //버섯 상태별로 저장하기

  const view = {
    growing,
    harvest,
    whiteflower,
    complete, 
    kinokoList, 
    kinoko,
    kinokoOnClick,
    name
  }
  
  
    
  return(
      <>
        {/* 선택한 기기 버섯 정보 가져오기 */}
        <KinokoInfo />
        {/* 버섯 화면에 보이기 -> mock은 test파일 원본은 farmBox */}
        {/* { loding === 1 ? (<Redirect to="/"/> ): (loding ? (<FarmMock  view={view} onClick={onClick}/>) : (<div>LODING....</div>))} */}
        { loding ? (<FarmMock  view={view} onClick={onClick}/>) : (<div>LODING....</div>)}
        
      </>
  )  
} 

export default withCookies(Farm) ;