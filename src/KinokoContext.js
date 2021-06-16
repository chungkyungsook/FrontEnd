import React, { createContext, useContext, useReducer } from 'react'

import {
  createAsyncDispatcher,
  createAsyncHandler,
  initialAsyncState
}from './asyncActionUtils';

import * as api from './KinokoApi';

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
  kinokologout: initialAsyncState
};

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const logoutHandler = createAsyncHandler('LOGOUT','logout');

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function usersReducer(state, action) {
  switch (action.type) {
    case 'GET_USERS':
    case 'GET_USERS_SUCCESS':
    case 'GET_USERS_ERROR':
      return usersHandler(state, action);
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

export function KinokoProvider({children}){
  const [state, dispatch] = useReducer(usersReducer,initialState)
  return(
    <KinokoStateContext.Provider value={state}>
      <KinokoDispatchContext.Provider value={dispatch}>
        {children}
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

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getlogout = createAsyncDispatcher('LOGOUT', api.getUsers);
