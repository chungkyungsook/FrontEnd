  //API
import {
  AWS_URL,
  LOGOUT,
  MACHINE_LIST
}from '../../Util/api'
import axios from 'axios';

//로그아웃 api
export async function getLogoutAccount( ){
  
  await axios.put(`${AWS_URL}${LOGOUT}`,{
    token: window.Kakao.Auth.getAccessToken()
  }).then(response =>{
    console.log("로그 아웃 성공",response);
  }).catch(e=>{
    console.log("로그 아웃 실패",e);
    
  })
}

//해당 계정의 기기목록을 가져옴
export async function getMachineList( ){

  await axios.get(`${AWS_URL}${MACHINE_LIST}`,{
    params:{
      token: window.Kakao.Auth.getAccessToken()
    }
  }).then(response =>{
    console.log(response);
  }).catch(e=>{
    console.log(e.response);
  })

}