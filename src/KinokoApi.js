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
  MACHINE_ID
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
    {token: '1111'}
  )
  return response.data
}

export async function getMachineList(){
  const response = await axios.get(`${AWS_URL}${MACHINE_LIST}`,{
    params:{
      // token: window.Kakao.Auth.getAccessToken()
      token: '1111'
    }
  });

  return response.data
}

export async function getMachineDeviceId(){
  const response = await axios.get(`${AWS_URL}${MACHINE_ID}`,{
    params:{
      // token: window.Kakao.Auth.getAccessToken()
      token: '1111'
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
      token: '1111'
  });

  return response.data
}

export async function getMachineSetting(id){
  const response = await axios.put(`${AWS_URL}${MUCHIN_SETTING}`,{
      id : id,
        // token: window.Kakao.Auth.getAccessToken()
      token: '1111'
  });
  console.log('gggg',response);
  return response.data
}

export async function getMachineDelete(id){
  const response = await axios.delete(`${AWS_URL}${MUCHIN_DELETE}`,{
    id:id
  });
  return response.data
}