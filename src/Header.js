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
    color : ${props => props.isOn === 'true' ? 'white' : 'gray' };
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
// setIsOn -> 선택한 기기 정보 넣기 
const Header = ({ location, cookies, setIsOn,isOn}) => {

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

    //logout 버튼 클릭
    const logoutOnClick = () =>{
        console.log("header logout token ",token)
        //로그아웃 알려주기
        axios.put(`http://${url}/api/logout`,{
            token: cookies.get('token')
        }).then((result) => {
            cookies.remove('isLogin')
        }).catch((err) => {
            console.log(err,"api/logout 오류발생") 
        }).finally(
            cookies.remove('isLogin')
        )    

        
    } 
    const [grdId, setGrdId] = useState(0)
    //선택한 기기 가동상태 확인
    const [value, setValue] = useState('') 

    //처음 시작 시 
      useEffect(()=>{
        console.log("================== Header 처음 실행 화면 ==================");
        // setIsOn('header에서 값 바꿈')
        //선택 된 기기 있는지 확인하기
        axios.get(
            `http://${url}/api/myfarm/id`,{
                params : {
                    token : cookies.get('token')
                }
            }
        ).then(data =>{
            // setGrdId(JSON.stringify(data.data))
            setIsOn({...isOn, id : parseInt(JSON.stringify(data.data))})
            //선택 된 기기 값 있으면 가동 상태 확인하기
            JSON.stringify(data.data) !== '0' &&             
            axios.get(`http://${url}/api/myfarm/status`,{
                params : {
                    id : JSON.stringify(data.data)
                    // id : 12
                }
            }).then(data =>{
                console.log('header 기기 상태값 확인',data);
                setValue(JSON.stringify(data.data))
            }).catch(e =>{
                console.log("Header 실행중인 기기 상태 error",e.err);
            })

        }).catch(e => {
            console.log("Header 실행중인 기기 값 error",e.err)
        })
        
      },[])

    const [userData, setUserData] = useState([])
    //해당 기기 상태 확인 후 있으면 실행
    useEffect(()=>{
        value && ( 
            axios.post(`http://${url}/api/myfarm/list`,{
                
                userId : cookies.get('userId')
                
            }).then((data) =>{ // 해당 user 정보 다 저장하기

                setUserData(data.data)

            }).catch(e =>{
                console.log('header 선택한 기기 정보 가져오기 실패',e.err);
            })
        )
        
    },[value])

    //선택한 기기 있으면 해당 기기 이름 가져오기
    useEffect(()=>{
        
        console.log("header 선택한 기기", userData);
        console.log("header 선택한 기기",isOn.id);
        console.log("header 선택한 기기",isOn.grgName);

        userData.map(data =>(
            // console.log(data,"grgId",isOn.id !==0 ? isOn.id : grdId),
            JSON.stringify(data.id) ==  isOn.id  && (
                // console.log(data.machine_name),
                setIsOn({
                    id : JSON.stringify(data.id),
                    grgName : data.machine_name
                })
            )
        ))

    },[isOn.id,userData,isOn.grgName])



   
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
                        <MachineName isOn={value}>-선택 기기- {isOn.grgName} </MachineName>
                        <MachineStatus>{value ? 'On' : 'Off'}</MachineStatus>
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
