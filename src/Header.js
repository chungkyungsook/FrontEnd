import React, { useEffect } from 'react' ;
import { withRouter} from 'react-router-dom' ;
import styled from 'styled-components' ;
import {Redirect}   from 'react-router-dom' ;
// Util
import { 
    HOME,
    FARM,
    HELP,
    SETTING,
} from './Util/routes' ;

import {
    flexAlign,
    userSelect
} from './Util/css' ;

import {
  AWS_URL,
  MACHINE_LIST
}from './Util/api'

import HeaderMenu from './HeaderMenu' ;

// 그림 리소스
import logoHeight from './assets/logoHeight.png' ;
import title from './assets/header_title.png' ;
import { withCookies } from 'react-cookie';
import { useState } from 'react';
import { getLogoutAccount } from './Kyungsook/Component/apiComponent';
import axios from 'axios';
import { useKinokoDispatch, useKinokoState, getlogout } from './KinokoContext';
// setIsOn -> 선택한 기기 정보 넣기 
const Header = ({ location}) => {

  // 메뉴 데이터
  const menuData = [ 
      {
          route : HOME,
          text : '마이 팜'
      },
      {
          route : SETTING,
          text : '팜 환경설정'
      },
      {
          route : FARM,
          text : '팜 정보'
      },
      {
          route : HELP,
          text : '도움말'
      }
  ] ;

  const state = useKinokoState();
  const dispatch = useKinokoDispatch();
  const [isLogout, setIsLogout] = useState(true);
  
  const logoutBtn = ()=>{
    getlogout(dispatch);
    if(window.Kakao.Auth.getAccessToken()){
        console.log("카카오 인증 액세스 토큰이 존재합니다.");
        
        window.Kakao.Auth.logout(()=>{
        console.log('로그아웃 되었습니다. ');
        setIsLogout(false)
        localStorage.clear()

      });
    }

  };
  
  // route 이름
  const { pathname } = location ;

  //path Check /login, /join 일시 가리는 값
  const pathCheck = pathname.includes(FARM) ? 
          FARM 
          : pathname.includes(SETTING) ? SETTING : pathname ;  

  //로그아웃

  useEffect(()=>{
    console.log('header');
    // fetchUsers()
  },[])
  
  if(!window.Kakao.Auth.getAccessToken()) return <Redirect to='/join'/>

  return (
      <div className='inner'>
          <Container views={ menuData.some(data => pathCheck === data.route) } >
              <TitleImgContainer>
                  <LogoImg src={logoHeight} width="70" height="70" draggable="false" />
                  <Img src={title} width="175" height="40" draggable="false" />
              </TitleImgContainer>
              <MenuContainer>
                  { menuData.map((menu, index) => (
                          <HeaderMenu 
                              key={index}
                              path={menu.route}
                              pathname={`/${pathname.split('/')[1]}`}
                          >
                              {menu.text}
                              
                          </HeaderMenu>
                  )) }
              </MenuContainer>
              <LogoutBtn onClick={logoutBtn} >로그아웃</LogoutBtn>
          </Container> 
      </div>
  ) ;
} ;

const Container = styled.header`
    display : ${props => props.views ? 'flex' : 'none' } ;
    background: rgb(160, 156, 128,0.9);
    font-weight: 700;
`;

const TitleImgContainer = styled.div`
    display : flex ;

    flex : 0.2 ;
`;

const Img = styled.img`
    ${userSelect}

    margin-top : 1.0rem ;

    cursor : default ;
`;

const LogoImg = styled.img`
    ${userSelect}

    background-position : center ;
    
    margin-right : 0.5rem ;
    margin-left : 1rem ;

    cursor : default ;
`;

const MenuContainer = styled.ul`
    ${flexAlign}

    flex : 0.6 ;
`;

const LogoutBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 18px;
  margin: 5px auto;
  
  width: 80px;
  padding: 5px;
  border: 2px solid #333;
  border-radius: 14px;
  color: #333;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  display: block;
  transition: .4s;

  :hover{
    background-color: #333;
    color: #fff;
}

`;
const loding_wrap = styled.div`


`;
export default withRouter(withCookies(Header)) ;
