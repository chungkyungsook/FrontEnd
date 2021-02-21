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

import {
    AWS_URL,
    LOGOUT,
    MACHINE_ID,
    MACHINE_STATUS
}from './Util/api'

import{
    LOGOUT_DEBUG,
    HEADER_DEBUG
}from './Util/debugging'

import HeaderMenu from './HeaderMenu' ;

// 그림 리소스
import logoHeight from './assets/logoHeight.png' ;
import title from './assets/HeaderTitle.png' ;
import { withCookies } from 'react-cookie';

// setIsOn -> 선택한 기기 정보 넣기 
const Header = ({ location, cookies, setIsOn,isOn,isValue, setIsValue,isLogin,setIsLogin,isCheck,setIsCheck,setKinokoInfo}) => {
/////////////////////////////////////////////////////////////////////////////////////
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
//----------------------------------------------------------------------
    const [token, setToken] = useState('')

/////////////////////////////////////////////////////////////////////////////////////
    useEffect(()=>{
        console.log("================== Header 처음 실행 화면 ==================");

    },[])

    useEffect(()=>{
        console.log("================== Header실행 화면 ==================");
        HEADER_DEBUG && console.log("token",cookies.get('token'));
        HEADER_DEBUG && console.log("Header isLogin 로그인 성공 여부:",isLogin);
        !isLogin && cookies.get('token') && setIsLogin(true)
        //token값이 있고 로그인 성공했으면 선택된 기기 있는 지 확인 해 주기 
        //-> 필요한 정보 : token,
        isLogin && (
            axios.get(`${AWS_URL}${MACHINE_ID}`,{
                params : {
                    token : cookies.get('token')
                }
            }).then(data => {
                //재배기 이름 추후 추가할 예정입니다.
                HEADER_DEBUG && console.log("Header 사용자가 선택한 재배기 ID 성공",parseInt(data.data.id))

                setIsOn({
                    id : parseInt(data.data.id),
                    prgName : data.data.name
                })

                //재배개 작동 상태 가져오기 isValue
                axios.get(`${AWS_URL}${MACHINE_STATUS}`,{
                    params :  {id : JSON.stringify(data.data.id)}
                }).then(data =>{
                    HEADER_DEBUG && console.log("Header 사용자가 선택한 재배기 작동 상태 성공",data.data)
                    setIsValue(data.data)
                }).catch(e =>{
                    HEADER_DEBUG && console.log("Header 사용자가 선택한 재배기 작동 상태 실패",e.response.status);
                })  

            }).catch(e =>{
                HEADER_DEBUG && console.log("Header 사용자가 선택한 재배기 ID 실패",e.response.status);
            })
        )

        isCheck === 1 && (
            
            axios.get(`${AWS_URL}${MACHINE_ID}`,{
                params : {
                    token : cookies.get('token')
                }
            }).then(data => {
                //재배기 이름 추후 추가할 예정입니다.
                HEADER_DEBUG && console.log("Header 사용자가 선택한 재배기 ID 성공",parseInt(data.data.id))

                setIsOn({
                    id : parseInt(data.data.id),
                    prgName : data.data.name
                })
                //재배개 작동 상태 가져오기 isValue
                axios.get(`${AWS_URL}${MACHINE_STATUS}`,{
                    params :  {id : JSON.stringify(data.data.id)}
                }).then(data =>{
                    HEADER_DEBUG && console.log("Header 사용자가 선택한 재배기 작동 상태 성공",data.data)
                    setIsValue(data.data)
                    setIsCheck(0) // 선택한 재배기 작동 상태 끝 로딩 화면을 위한 설정
                    
                }).catch(e =>{
                    HEADER_DEBUG && console.log("Header 사용자가 선택한 재배기 작동 상태 실패",e.response.status);
                })  

            }).catch(e =>{
                e.response.status === '404' && (console.log('값 바뀜'))
                HEADER_DEBUG && console.log("Header 사용자가 선택한 재배기 ID 실패",e.response.status);
                               
            })
        )
    },[isLogin,isCheck])

/////////////////////////////////////////////////////////////////////////////////////

    //logout 버튼 클릭
    const logoutOnClick = () =>{
        console.log("header logout token ",token)
        
        axios.put(`${AWS_URL}${LOGOUT}`,{
            token: cookies.get('token')
        }).then((data) => {
            LOGOUT_DEBUG && console.log(data,'로그아웃 성공')
            cookies.remove('token')
            cookies.remove('userId')
        }).catch((e) => {
            LOGOUT_DEBUG && console.log(e.response.status)
            LOGOUT_DEBUG && console.log(e.response.data,"로그아웃 실패")
        })
        
    } 
    

   
    return (
        <>
        { cookies.get('token') ? (
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
                        <MachineName isValue={isValue}>-선택 기기- {isOn.prgName} </MachineName>
                        <MachineStatus>{isValue ? 'On' : 'Off'}</MachineStatus>
                    </MachineContainer>

                    <UserContainer>
                        <LoginStatus onClick={logoutOnClick}>Logout</LoginStatus>
                    </UserContainer>
                </InformationContainer>
            </Container> ) :
            (<Redirect to="login" />)
            }
        </>
    ) ;
} ;

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
    color : ${props => props.isValue ? 'white' : 'gray' };
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

export default withRouter(withCookies(Header)) ;
