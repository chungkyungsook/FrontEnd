import axios from 'axios';
import {
  AWS_URL,
  LOGOUT,
  MACHINE_LIST,
  MUCHIN_KYE,
  MUCHIN_PWD,
  MUCHIN_MAKE_DEVICE,
  MUCHIN_SETTING,
  MUCHIN_DELETE,
  MACHINE_ID,
  MUSHROOM_ALL,
  PRG_NAME,
  DATE,
  IMG_COMPOST,
  MUSHROOM_CLUSTER,
  MUSHROOM_IMG_HISTROY,
  MUSHROOM_ROTATION
} from './Util/api'

export async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

export async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

//로그아웃 api
export async function getLogoutAccount( ){
  
  const response = await axios.put(
    `${AWS_URL}${LOGOUT}`,
    // {token: window.Kakao.Auth.getAccessToken()}
    {token: window.Kakao.Auth.getAccessToken()}
  )
  return response.data
}

export async function getMachineList(){
  const response = await axios.get(`${AWS_URL}${MACHINE_LIST}`,{
    params:{
      // token: window.Kakao.Auth.getAccessToken()
      token: window.Kakao.Auth.getAccessToken()
    }
  });

  return response.data
}

export async function getMachineDeviceId(){
  const response = await axios.get(`${AWS_URL}${MACHINE_ID}`,{
    params:{
      // token: window.Kakao.Auth.getAccessToken()
      token: window.Kakao.Auth.getAccessToken()
    }
  });

  return response.data
}

//재배기 등록 
export async function getMachineKey(pin){
  const response = await axios.get(`${AWS_URL}${MUCHIN_KYE}`,{
    params:{
      pin : pin
    }
  });

  return response.data
}

export async function getMachinePwd({pin,pw}){
  const response = await axios.get(`${AWS_URL}${MUCHIN_PWD}`,{
    params:{
      pin : pin,
      pw : pw
    }
  });

  return response.data
}

export async function getMachineMakeDevice({pin,pw,machineName}){
  const response = await axios.put(`${AWS_URL}${MUCHIN_MAKE_DEVICE}`,{
      pin : pin,
      pw : pw,
      machineName : machineName,
      // token: window.Kakao.Auth.getAccessToken()
      token: window.Kakao.Auth.getAccessToken()
  });

  return response.data
}

export async function getMachineSetting(id){
  const response = await axios.put(`${AWS_URL}${MUCHIN_SETTING}`,{
      id : id,
        // token: window.Kakao.Auth.getAccessToken()
      token: window.Kakao.Auth.getAccessToken()
  });
  return response.data
}

export async function getMachineDelete(id){
  const response = await axios.delete(`${AWS_URL}${MUCHIN_DELETE}`,{
    params:{id:id}
  });
  return response.data
}

//프로그램 id, name : 파라미터  기기 id
export async function getProgramInfo(id){
  const response = await axios.get(`${AWS_URL}${PRG_NAME}`,{
    params:{id:id}
  });
  return response.data
}

// 모든 버섯 정보 가져오기 : 프로그램 id
export async function getMushroomInfo(prgId){
  console.log('prgid',prgId);
  const response = await axios.get(`${AWS_URL}${MUSHROOM_ALL}`,{
    params:{prgId:prgId}
  });
  return response.data
}
// 프로그램 시작 날짜 가져오기
export async function getStartDay(prgId){
  console.log('prgid',prgId);
  const response = await axios.get(`${AWS_URL}${DATE}`,{
    params:{id:prgId}
  });
  return response.data
}

// 객체 하나의 버섯 사진 가져오기
export async function getMushroomImg(id){
  const response = await axios.get(`${AWS_URL}${IMG_COMPOST}/1`);
  return response.data
}

export async function getMushroom3D(){
  console.log('실행됨');
  const response = await axios.get('http://184.73.45.24/api/check/ply');
  return response.data
}

// 오늘 성장한 버섯 정보 가져오기
export async function getMushroomGrowInfo(prgId){
  const response = await axios.get(`${AWS_URL}${MUCHIN_DELETE}/growing`,{
    params:{prgId:prgId}
  });
  return response.data
}
// 수확 가능한 버섯 정보 가져오기
export async function getMushroomHarvestInfo(prgId){
  const response = await axios.get(`${AWS_URL}${MUCHIN_DELETE}/harvest`,{
    params:{prgId:prgId}
  });
  return response.data
}

// 실시간 배지 이미지 각도별로 획득
export async function getMushroomCluster(prgId){
  const response = await axios.get(`${AWS_URL}${MUSHROOM_CLUSTER}/${prgId}`);
  return response.data
}
// 각도별 표고버섯 이미지 사진 가져오기 
export async function getMushroomRotation({prgId,rotation}){
  const response = await axios.get(`${AWS_URL}${MUSHROOM_ROTATION}`,{
    params:{
      prgId:prgId,
      rotation:rotation
    }
  });
  return response.data
}

// 각도별 표고버섯 이미지 사진 가져오기 
export async function getMushroomHistory(prgId){
  const response = await axios.get(`${AWS_URL}${MUSHROOM_IMG_HISTROY}/${prgId}`);
  return response.data
}