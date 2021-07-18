import React, { createContext, useContext, useReducer, useState } from 'react'

import {
  createAsyncDispatcher,
  createAsyncHandler,
  initialAsyncState
}from './asyncActionUtils';

import * as api from './KinokoApi';

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
  kinokologout: initialAsyncState,
  muchinList: initialAsyncState,
  muchinKey : initialAsyncState,
  muchinPwd: initialAsyncState,
  muchinMakeDevice: initialAsyncState,
  muchinSetting:initialAsyncState,
  muchinDelete:initialAsyncState,
  muchinDeviceId:initialAsyncState,
  programInfo: initialAsyncState,
  getMushroomInfo:initialAsyncState,
  getStartDay: initialAsyncState,
  getMushroomImg:initialAsyncState,
  getMushroom3D:initialAsyncState,
  getMushroomCluster:initialAsyncState,
  getMushroomHistory:initialAsyncState,
  getMushroomRotation:initialAsyncState
};

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const muchinListHandler = createAsyncHandler('GET_MUCHIN_LIST','muchinList');

const muchinKeyHandler = createAsyncHandler('GET_MUCHIN_KEY','muchinKey');
const muchinPwdHandler = createAsyncHandler('GET_MUCHIN_PWD','muchinPwd');
const muchinMakeDeviceHandler = createAsyncHandler('GET_MUCHIN_MAKE_DEVICE','muchinMakeDevice');

const muchinDevicIdeHandler = createAsyncHandler('GET_MUCHIN_DEVICE_ID','muchinDeviceId');

const muchinSettingHandler = createAsyncHandler('GET_MUCHIN_SETTING','muchinSetting');
const muchinDeleteHandler = createAsyncHandler('GET_MUCHIN_DELETE','muchinDelete');

//사용자가 선택한 프로그램 정보 가져오기
const programInfoHandler = createAsyncHandler('GET_PROGRAM_INFO', 'programInfo')

//getMushroomInfo
const mushroomInfoHandler = createAsyncHandler('GET_MUSHROOM_INFO', 'getMushroomInfo')
const mushroomImgHandler = createAsyncHandler('GET_MUSHROOM_IMG', 'getMushroomImg')
const mushroom3DHandler = createAsyncHandler('GET_MUSHROOM_IMG', 'getMushroom3D')
const startDayHandler = createAsyncHandler('GET_START_DATE', 'getStartDay')

// 실시간 표고버섯 배지 이미지 정보 가져오기
const mushroomClusterHandler = createAsyncHandler("GET_MUSHROOM_CLUSTER",'getMushroomCluster')
// 지정한 각도에 해당하는 버섯들을 가져오기
const mushroomRotationHandler = createAsyncHandler("GET_MUSHROOM_ROTATION",'getMushroomRotation')
// 실시간 표고버섯 배지 이미지 가져오기 
const mushroomHistoryHandler = createAsyncHandler("GET_MUSHROOM_HISTORY",'getMushroomHistory')

const logoutHandler = createAsyncHandler('LOGOUT','logout');


// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function usersReducer(state, action) {
  switch (action.type) {
    case 'GET_USERS':
    case 'GET_USERS_SUCCESS':
    case 'GET_USERS_ERROR':
      return usersHandler(state, action);
    //사용자가 등록한 모든 재배기 가져오기
    case 'GET_MUCHIN_LIST':
    case 'GET_MUCHIN_LIST_SUCCESS':
    case 'GET_MUCHIN_LIST_ERROR':
      return muchinListHandler(state, action);
    case 'GET_MUCHIN_KEY':
    case 'GET_MUCHIN_KEY_SUCCESS':
    case 'GET_MUCHIN_KEY_ERROR':
      return muchinKeyHandler(state, action);
    case 'GET_MUCHIN_PWD':
    case 'GET_MUCHIN_PWD_SUCCESS':
    case 'GET_MUCHIN_PWD_ERROR':
      return muchinPwdHandler(state, action);
    // 재배기 등록하기
    case 'GET_MUCHIN_MAKE_DEVICE':
    case 'GET_MUCHIN_MAKE_DEVICE_SUCCESS':
    case 'GET_MUCHIN_MAKE_DEVICE_ERROR':
      return muchinMakeDeviceHandler(state, action);
    // 재배기 id 가져오기
    case 'GET_MUCHIN_DEVICE_ID':
    case 'GET_MUCHIN_DEVICE_ID_SUCCESS':
    case 'GET_MUCHIN_DEVICE_ID_ERROR':
      return muchinDevicIdeHandler(state, action);
    //재배기 사용하기
    case 'GET_MUCHIN_SETTING':
    case 'GET_MUCHIN_SETTING_SUCCESS':
    case 'GET_MUCHIN_SETTING_ERROR':
      return muchinSettingHandler(state, action);
    //재배기 삭제하기
    case 'GET_MUCHIN_DELETE':
    case 'GET_MUCHIN_DELETE_SUCCESS':
    case 'GET_MUCHIN_DELETE_ERROR':
      return muchinDeleteHandler(state, action);
    // 재배기가 사용중인 프로그램 id, name 가져오기
    case 'GET_PROGRAM_INFO':
    case 'GET_PROGRAM_INFO_SUCCESS':
    case 'GET_PROGRAM_INFO_ERROR':
      return programInfoHandler(state, action);
    // 모든 버섯 성장정보 가져오기
    case 'GET_MUSHROOM_INFO':
    case 'GET_MUSHROOM_INFO_SUCCESS':
    case 'GET_MUSHROOM_INFO_ERROR':
      return mushroomInfoHandler(state, action);
    // 프로그램 시작날짜 가져오기
    case 'GET_START_DATE':
    case 'GET_START_DATE_SUCCESS':
    case 'GET_START_DATE_ERROR':
      return startDayHandler(state, action);
    case 'GET_MUSHROOM_IMG':
    case 'GET_MUSHROOM_IMG_SUCCESS':
    case 'GET_MUSHROOM_IMG_ERROR':
      return mushroomImgHandler(state, action);
    case 'GET_MUSHROOM_3D':
    case 'GET_MUSHROOM_3D_SUCCESS':
    case 'GET_MUSHROOM_3D_ERROR':
      return mushroom3DHandler(state, action);
    case 'GET_MUSHROOM_CLUSTER':
    case 'GET_MUSHROOM_CLUSTER_SUCCESS':
    case 'GET_MUSHROOM_CLUSTER_ERROR':
      return mushroomClusterHandler(state, action);  
    case 'GET_MUSHROOM_ROTATION':
    case 'GET_MUSHROOM_ROTATION_SUCCESS':
    case 'GET_MUSHROOM_ROTATION_ERROR':
      return mushroomRotationHandler(state, action);  
    case 'GET_MUSHROOM_HISTORY':
    case 'GET_MUSHROOM_HISTORY_SUCCESS':
    case 'GET_MUSHROOM_HISTORY_ERROR':
      return mushroomHistoryHandler(state, action);  
    case 'LOGOUT':
    case 'LOGOUT_SUCCESS':
    case 'LOGOUT_ERROR':
      return logoutHandler(state, action);
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

const KinokoStateContext = createContext(null);
const KinokoDispatchContext = createContext(null);
const IsLoginContext = createContext()

export function KinokoProvider({children}){
  const [state, dispatch] = useReducer(usersReducer,initialState)
  const [isLogin, setIsLogin] = useState(false)
  return(
    <KinokoStateContext.Provider value={state}>
      <KinokoDispatchContext.Provider value={dispatch}>
        <IsLoginContext.Provider value={{isLogin, setIsLogin}}>
          {children}
        </IsLoginContext.Provider>
      </KinokoDispatchContext.Provider>
    </KinokoStateContext.Provider>
  )
}

export function useKinokoState(){
  const state = useContext(KinokoStateContext);
  if(!state){
    throw new Error('Cannot find UsersProvider');
  }
  return state;
}

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useKinokoDispatch() {
  const dispatch = useContext(KinokoDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find UsersProvider');
  }
  return dispatch;
}

export function useLoginContext() {
  return useContext(IsLoginContext)
}

// 1번
export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getMuchineList = createAsyncDispatcher('GET_MUCHIN_LIST', api.getMachineList);
export const getlogout = createAsyncDispatcher('LOGOUT', api.getLogoutAccount);

//프로그램 id 

//기기 등록
export const getMuchineKey = createAsyncDispatcher('GET_MUCHIN_KEY', api.getMachineKey)
export const getMuchinePwd = createAsyncDispatcher('GET_MUCHIN_PWD', api.getMachinePwd)
export const getMuchineMakeDevice = createAsyncDispatcher('GET_MUCHIN_MAKE_DEVICE', api.getMachineMakeDevice)


// 사용자의 재배기 정보 가져오기
export const getMuchineDeviceId = createAsyncDispatcher('GET_MUCHIN_DEVICE_ID', api.getMachineDeviceId)

// 재배기 선택 & 삭제
export const getMuchineSetting = createAsyncDispatcher('GET_MUCHIN_SETTING', api.getMachineSetting)
export const getMuchineDelete = createAsyncDispatcher('GET_MUCHIN_DELETE', api.getMachineDelete)

// 선택한 재배기의 프로그램 이름, id 가져오기
export const getProgramInfo = createAsyncDispatcher('GET_PROGRAM_INFO',api.getProgramInfo)

// 프로그램 시작한 날짜 가져오기
export const getStartDay = createAsyncDispatcher('GET_START_DATE',api.getStartDay)

// 모든 버섯 성장 정보 가져오기
export const getMushroomInfo = createAsyncDispatcher('GET_MUSHROOM_INFO',api.getMushroomInfo)

// 객체 하나의 버섯 사진 가져오기
export const getMushroomImg = createAsyncDispatcher('GET_MUSHROOM_IMG',api.getMushroomImg)
// 객체 하나의 버섯 사진 가져오기
export const getMushroom3D = createAsyncDispatcher('GET_MUSHROOM_3D',api.getMushroom3D)


// 실시간 표고버섯 이미지 정보 가져오기
export const getMushroomCluster = createAsyncDispatcher('GET_MUSHROOM_CLUSTER',api.getMushroomCluster)

// 지정한 각도에 해당하는 버섯들을 가져오기
export const getMushroomRotation = createAsyncDispatcher('GET_MUSHROOM_ROTATION',api.getMushroomRotation)


// 실시간 표고버섯 배지 이미지 가져오기 
export const getMushroomHistory = createAsyncDispatcher('GET_MUSHROOM_HISTORY',api.getMushroomHistory)