import axios from 'axios';
import {
  AWS_URL,
  LOGOUT,
  MACHINE_LIST
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
    {token: window.Kakao.Auth.getAccessToken()}
  )
  return response.data
}