import React, { useEffect, useMemo, useState } from 'react' ;
import { withRouter,Redirect } from 'react-router-dom' ;
import axios from "axios";
import styled from 'styled-components' ;

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

import HeaderMenu from './HeaderMenu' ;

// 그림 리소스
import logoHeight from './assets/logoHeight.png' ;
import title from './assets/HeaderTitle.png' ;
import { withCookies } from 'react-cookie';

const Container = styled.header`
    display : ${props => props.views ? 'flex' : 'none' } ;
    background: rgb(160, 156, 128,0.9);
    /* background-color : ; */
`;

const TitleImgContainer = styled.div`
    display : flex ;

    flex : 0.2 ;
`;

const Img = styled.img`
    ${userSelect}

    margin-top : 1.5rem ;

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

const InformationContainer = styled.div`
    ${flexAlign}

    justify-content : flex-end ;
    flex : 0.2 ;
`;

const MachineContainer = styled.div`
    ${flexAlign}
    height : 75% ;
    flex: 1;
    // 로그인 글자 사이 줄 색깔
    border-right : 1px solid #111 ;
`;

const UserContainer = styled.div`
    
`;  

const MachineName = styled.div`
    ${userSelect}
    flex : 1;
    text-align: center;
    cursor : default ;
    color : ${props => props.isOn ? 'white' : 'gray' };
`;



const MachineStatus = styled.span`  
    ${userSelect}
    
    padding: 9px;
    cursor : pointer ;
`;

const LoginStatus = styled.span`
    ${userSelect}
    
    padding : 30px ;
`;

const Header = ({ location, cookies}) => {

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
    
    // route 이름
    const { pathname } = location ;

    //path Check /login, /join 일시 가리는 값
    const pathCheck = pathname.includes(FARM) ? 
            FARM 
            : pathname.includes(SETTING) ? SETTING : pathname ;  

    const [token, setToken] = useState('')

    //url
    const url = '172.26.3.62'

    //처음 시작시
    useEffect(()=>{
        //token저장
        setToken(cookies.get('token') && cookies.get('token'))
        // console.log('token');

        //선택한 device 저장
        setValue(cookies.get('deviceNumber') && cookies.get('deviceNumber'))
        console.log("---------------",value)
    },[])
    //logout 버튼 클릭
    const logoutOnClick = () =>{
    
        //로그아웃 알려주기
        axios.put(`http://${url}/api/logout`,{
            token: JSON.stringify(token)
        }).then((result) => {
            cookies.remove('isLogin')
        }).catch((err) => {
            console.log(err,"api/logout 오류발생") 
        }).finally(
            cookies.remove('isLogin')
        )    

        
    } 

    //기기 on / off
    const [isOn, setIsOn] = useState(false)
    //선택한 기기 정보 담기
    const [value, setValue] = useState('')

    //기기 가동 상태on/off 
    const isOnBtn = ()=>{
        
        isOn ? setIsOn(false) : setIsOn(true)
        console.log("header token ",token)
        axios.get(`http://${url}/api/myfarm/status`,{
            token : JSON.stringify(token)
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err,"header, isOnBtn 함수 오류 발생!!!")
        })
    };


    useEffect(()=>{
        value && console.log("22222222222222",value)
    },[value])
   
    return (
        <>
            <Container views={ menuData.some(data => pathCheck === data.route) } >
                <TitleImgContainer>
                    <LogoImg src={logoHeight} width="70" height="70" draggable="false" />
                    <Img src={title} width="175" height="30" draggable="false" />
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
                <InformationContainer>
                    
                    {/* 기기 관리 */}
                    <MachineContainer>
                        <MachineName isOn={isOn}>-선택 기기- {value && value.machine_name}</MachineName>
                        <MachineStatus onClick={isOnBtn}>{isOn ? 'On' : 'Off'}</MachineStatus>
                    </MachineContainer>

                    <UserContainer>
                        <LoginStatus onClick={logoutOnClick}>Logout</LoginStatus>
                    </UserContainer>
                </InformationContainer>
            </Container> 
        </>
    ) ;
} ;

export default withRouter(withCookies(Header)) ;
